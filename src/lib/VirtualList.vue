<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

export interface VirtualListProps<T = unknown> {
  /**
   * Full data array to render virtually.
   */
  items: readonly T[];

  /**
   * Height of the scroll viewport (in pixels).
   */
  height: number;

  /**
   * Fixed height of each item (in pixels).
   * This simple implementation assumes fixed row height.
   */
  itemHeight: number;

  /**
   * Extra items rendered above and below the viewport
   * to avoid pop‑in during fast scrolling.
   */
  overscan?: number;
}

const props = defineProps<VirtualListProps>();

const containerRef = ref<HTMLElement | null>(null);
const scrollTop = ref(0);

const totalHeight = computed(() => props.items.length * props.itemHeight);

const viewportItemCount = computed(() => {
  if (!props.itemHeight) return 0;
  return Math.ceil(props.height / props.itemHeight);
});

const overscan = computed(() => props.overscan ?? 5);

const startIndex = computed(() => {
  if (!props.itemHeight) return 0;
  const raw = Math.floor(scrollTop.value / props.itemHeight) - overscan.value;
  return Math.max(0, raw);
});

const endIndex = computed(() => {
  const raw = startIndex.value + viewportItemCount.value + overscan.value * 2;
  return Math.min(props.items.length, raw);
});

const visibleItems = computed(() => {
  return props.items.slice(startIndex.value, endIndex.value);
});

const offsetTop = computed(() => startIndex.value * props.itemHeight);

function handleScroll() {
  if (!containerRef.value) return;
  scrollTop.value = containerRef.value.scrollTop;
}

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  const el = containerRef.value;
  if (!el) return;

  scrollTop.value = el.scrollTop;

  // If the consumer uses a percentage height or flexbox,
  // we keep viewportItemCount reactive by watching container height.
  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(() => {
      // Trigger recomputation by changing scrollTop by 0.
      scrollTop.value = el.scrollTop;
    });
    resizeObserver.observe(el);
  }
});

onBeforeUnmount(() => {
  if (resizeObserver && containerRef.value) {
    resizeObserver.unobserve(containerRef.value);
  }
  resizeObserver = null;
});

// Keep scroll position in bounds when items change.
watch(
  () => props.items.length,
  () => {
    const maxScroll = Math.max(0, totalHeight.value - props.height);
    if (scrollTop.value > maxScroll) {
      scrollTop.value = maxScroll;
      if (containerRef.value) {
        containerRef.value.scrollTop = maxScroll;
      }
    }
  }
);
</script>

<template>
  <div ref="containerRef" class="virtual-list-vue-container" :style="{
    height: `${height}px`,
    overflowY: 'auto',
    position: 'relative'
  }" @scroll="handleScroll">
    <div class="virtual-list-vue-spacer" :style="{
      height: `${totalHeight}px`,
      position: 'relative'
    }">
      <div class="virtual-list-vue-inner" :style="{
        transform: `translateY(${offsetTop}px)`,
        willChange: 'transform'
      }">
        <slot v-for="(item, index) in visibleItems" :key="startIndex + index" :item="item"
          :index="startIndex + index" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.virtual-list-vue-container {
  width: 100%;
}
</style>
