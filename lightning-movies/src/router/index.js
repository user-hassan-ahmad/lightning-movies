import { createRouter, createWebHistory } from 'vue-router';
import Films from '../components/Films.vue';
import FilmPage from '../components/FilmPage.vue';

const routes = [
	{
		path: '/',
		name: 'Films',
		component: Films,
	},
	{
		path: '/film-page/:id/',
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
