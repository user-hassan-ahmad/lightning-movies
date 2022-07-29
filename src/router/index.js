import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Films from '../components/Films.vue';
import FilmPage from '../components/FilmPage.vue';
import Registration from '../components/Registration.vue';
import SignIn from '../components/SignIn.vue';
import WatchList from '../components/WatchList.vue';

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
	{
		path: '/register',
		name: 'Register',
		component: Registration,
	},
	{
		path: '/sign-in',
		name: 'Sign In',
		component: SignIn,
	},
	{
		path: '/watch-list',
		name: 'Watch List',
		component: WatchList,
		meta: {
			requiresAuth: true,
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const removeListener = onAuthStateChanged(
			getAuth(),
			(user) => {
				resolve(user);
			},
			reject
		);
	});
};

router.beforeEach(async (to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (await getCurrentUser()) {
			next();
		} else {
			alert('Please sign in to use this feature');
			next('/');
		}
	} else {
		next();
	}
});

export default router;
