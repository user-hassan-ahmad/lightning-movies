import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import './index.css';

axios.defaults.baseURL = '/';

createApp(App).use(router).use(store).mount('#app');
