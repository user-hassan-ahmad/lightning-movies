import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Films from '../components/Films.vue';
import FilmPage from '../components/FilmPage.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/films',
		name: 'Films',
		component: Films,
	},
	{
		path: '/film-page/:id/:filmTitle',
		name: 'Film Page',
		component: FilmPage,
		props: true,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
