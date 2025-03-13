import './assets/styles/global.css';
import 'normalize.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { createApp } from 'vue';
import router from './router';
import naive from 'naive-ui';
import App from './App.vue';

library.add(faInstagram, faXTwitter)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(naive)
app.use(router) 
app.mount('#app')