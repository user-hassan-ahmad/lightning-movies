import axios from 'axios';

export default {
	state: {
		films: [],
		filmID: '',
		film: {},
		query: '',
		totalResults: '',
		totalPages: Number,
		page: 1,
	},
	getters: {
		getQuery(state) {
			return state.query;
		},
	},
	mutations: {
		setFilms(state, films) {
			state.films = films.Search;
			state.totalResults = films.totalResults;
			state.totalPages = Math.ceil(state.totalResults / 10);
		},
		setFilmID(state, filmID) {
			state.filmID = filmID;
		},
		setFilm(state, film) {
			state.film = film;
		},
		setQuery(state, query) {
			state.query = query;
		},
		setPage(state, page) {
			state.page = page;
		},
		upPage(state) {
			if (state.totalPages > 0) {
				state.page < state.totalPages
					? state.page++
					: (state.page = state.totalPages);
			}
		},
		downPage(state) {
			state.page > 1 ? state.page-- : (state.page = 1);
		},
	},
	actions: {
		getFilms: async ({ commit, state }) => {
			if (state.query.length > 0) {
				try {
					const response = await axios
						.get(
							`http://www.omdbapi.com/?s=${state.query}&apikey=1d8829c5&page=${state.page}`
						)
						.then((response) => {
							commit('setFilms', response.data);
						});
				} catch (err) {
					// Handle Error Here
					console.error(err);
				}
			} else {
				commit('setFilms', []);
			}
		},

		getSpecificFilm: async ({ commit, state }) => {
			try {
				const response = await axios
					.get(`http://www.omdbapi.com/?i=${state.filmID}&apikey=1d8829c5`)
					.then((response) => {
						console.log(response.data);
						commit('setFilm', response.data);
					});
			} catch (err) {
				// Handle Error Here
				console.error(err);
			}
		},
	},
};
