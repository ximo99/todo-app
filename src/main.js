import { createApp } from 'vue';
import App from './App.vue';
import store from './store/store';

import vFocus from './directives/v-focus';

const app = createApp(App);

app.directive('focus', vFocus);

app.use(store);

app.mount('#app');
