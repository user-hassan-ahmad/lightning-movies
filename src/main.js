import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import './index.css';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAh2ZgLhnMfY4km3UrtBwrRjqLf-KQwP5c',
	authDomain: 'lightning-movies.firebaseapp.com',
	projectId: 'lightning-movies',
	storageBucket: 'lightning-movies.appspot.com',
	messagingSenderId: '663234824600',
	appId: '1:663234824600:web:05c954189ae4b9ec6d43ed',
	measurementId: 'G-L8J85R11QS',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };

axios.defaults.baseURL = '/';

createApp(App).use(router).use(store).mount('#app');
