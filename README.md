## virtual-list-vue

**`virtual-list-vue`** is a small virtual list component for **Vue 3**.  
It only renders the visible items in a scrollable container, which keeps your app fast even with tens of thousands of rows.

### Install

```bash
npm install virtual-list-vue
# or
yarn add virtual-list-vue
```

Peer dependency:

- **vue** `^3.3.0`

### Basic usage

Register the plugin in your Vue app:

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import VirtualListVue from 'virtual-list-vue';

createApp(App)
  .use(VirtualListVue)
  .mount('#app');
```

Now you can use the `VirtualList` component anywhere.

```vue
<script setup lang="ts">
import { ref } from 'vue';

const items = ref(
  Array.from({ length: 10000 }, (_, i) => `Item #${i + 1}`)
);
</script>

<template>
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
        <span style="font-variant-numeric: tabular-nums; width: 72px; color: #6b7280;">
          #{{ index + 1 }}
        </span>
        <span>{{ item }}</span>
      </div>
    </template>
  </VirtualList>
</template>
```

### Props

- **`items`** (`any[]`, required): Full array of items to render virtually.
- **`height`** (`number`, required): Height of the scroll container in pixels.
- **`item-height`** (`number`, required): Fixed height of each row in pixels.
- **`overscan`** (`number`, optional, default `5`): Extra items rendered above and below the viewport to make scrolling smoother.

### Slots

- **default slot**: Receives an object `{ item, index }` for each visible item.

Example:

```vue
<VirtualList :items="items" :height="400" :item-height="40">
  <template #default="{ item, index }">
    <div>{{ index }} – {{ item }}</div>
  </template>
</VirtualList>
```

### Local development demo

This repository already contains a small demo using `virtual-list-vue`.

```bash
npm install
npm run dev
```

Then open the printed URL in your browser to see the virtual list in action.

