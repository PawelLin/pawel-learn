import './assets/index.less'

import { createApp } from 'vue'
import router from './router'
import directive from './directive'
import App from './App.vue'

createApp(App).use(router).use(directive).mount('#app')
