import { createStore } from 'vuex';
import omdb from './modules/omdb';

const store = createStore({
	modules: {
		omdb,
	},
});

export default store;
