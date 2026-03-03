import type { App } from 'vue'
import VirtualList from './VirtualList.vue'

export { VirtualList }

export function install(app: App) {
  app.component('VirtualList', VirtualList)
}

export default {
  install,
}


