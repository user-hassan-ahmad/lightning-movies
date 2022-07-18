import { createStore } from 'vuex';
import omdb from './modules/omdb';
import news from './modules/news';

const store = createStore({
	modules: {
		omdb,
		news,
	},
});

export default store;
