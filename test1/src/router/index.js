import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Films from '../components/Films.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/films',
		name: 'films',
		component: Films,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
