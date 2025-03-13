import './assets/styles/global.css';
import 'normalize.css';

import { createApp } from 'vue';
import router from './router';
import naive from 'naive-ui';
import App from './App.vue';

const app = createApp(App)
app.use(naive)
app.use(router) 
app.mount('#app')