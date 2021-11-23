import { createApp } from 'vue';
import App from './App.vue';
import Router from '@/router';
import { store, key } from '@/store';
import '@/styles';

createApp(App)
  .use(Router)
  .use(store, key)
  .mount('#app');
