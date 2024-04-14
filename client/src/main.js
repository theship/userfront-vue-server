import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Userfront from '@userfront/toolkit/vue'
Userfront.init("6bgxxj9n")

// try {
//     Userfront.init('123abc4d');
//     console.log("Userfront initialization likely successful"); 
// } catch (error) {
//     console.error("Userfront initialization error:", error);
// }
    
createApp(App).use(store).use(router).mount('#app');
// Path: client/src/router/index.js
