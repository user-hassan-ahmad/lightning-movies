import axios from 'axios';

export default {
	state: {
		articles: [],
	},
	getters: {},
	mutations: {
		setArticles(state, articles) {
			state.articles = articles;
		},
	},
	actions: {
		getNewsArticles: async ({ commit, state }) => {
			try {
				const response = await axios.get('api/').then((response) => {
					console.log(response.data);
					commit('setArticles', response.data);
				});
			} catch (err) {
				// Handle Error Here
				console.error(err);
			}
		},
	},
};
