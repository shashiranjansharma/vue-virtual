<script setup lang="ts">
import { ref } from 'vue'
import { VirtualList } from './lib'

const items = ref(Array.from({ length: 10000 }, (_, i) => `Item #${i + 1}`))
</script>

<template>
  <main style="padding: 1.5rem; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
    <h1 style="font-size: 1.5rem; margin-bottom: 1rem;">
      virtual-list-vue demo
    </h1>

    <p style="margin-bottom: 1rem; color: #4b5563;">
      Scroll the list below to see virtual rendering in action. Only the visible items are mounted.
    </p>

    <VirtualList
      :items="items"
      :height="400"
      :item-height="40"
      :overscan="5"
    >
      <template #default="{ item, index }">
        <div
          :style="{
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            borderBottom: '1px solid #e5e7eb',
            background: index % 2 === 0 ? '#f9fafb' : '#ffffff'
          }"
        >
          <span style="font-variant-numeric: tabular-nums; color: #6b7280; width: 72px;">
            #{{ index + 1 }}
          </span>
          <span>{{ item }}</span>
        </div>
      </template>
    </VirtualList>
  </main>
</template>

