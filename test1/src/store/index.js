import { createStore } from 'vuex';
import counter from './modules/counter';
import omdb from './modules/omdb';

const store = createStore({
	modules: {
		counter,
		omdb,
	},
});

export default store;
