import axios from 'axios';

export default {
	state: {
		films: [],
		filmID: '',
		film: {},
		parentalGuidance: [],
		watchGuide: [],
		YTSDetails: {},
		query: '',
		totalResults: '',
		totalPages: Number,
		page: 1,
	},
	getters: {
		getQuery(state) {
			return state.query;
		},
		getMovieSuggestions(state) {
			return state.YTSDetails[1].movieSuggestions;
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
		setParentalGuidance(state, parentalGuidance) {
			state.parentalGuidance = parentalGuidance;
		},
		setWatchGuide(state, watchGuide) {
			state.watchGuide = watchGuide;
		},
		setYTSDetails(state, YTSDetails) {
			state.YTSDetails = YTSDetails;
		},
		setMovieSuggestions(state, movieSuggestions) {
			state.movieSuggestions = movieSuggestions;
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

		getParentalGuidance: async ({ commit, state }) => {
			try {
				const response = await axios
					.get('http://localhost:8080/parental-guide', {
						params: {
							imdbID: state.filmID,
						},
					})
					.then((response) => {
						console.log(response.data);
						commit('setParentalGuidance', response.data);
					});
			} catch (err) {
				console.error(err);
			}
		},

		getWatchGuide: async ({ commit, state }) => {
			try {
				const response = await axios
					.get('http://localhost:8080/watch-guide-v1', {
						params: {
							imdbID: state.filmID,
						},
					})
					.then((response) => {
						console.log(response.data);
						commit('setWatchGuide', response.data);
					});
			} catch (err) {
				console.log(err);
			}
		},

		getYTSDetails: async ({ commit, state }) => {
			try {
				const response = await axios('http://localhost:8080/watch-yts', {
					params: {
						imdbID: state.filmID,
					},
				}).then((response) => {
					const YTSDetails = response.data[0].movieDetails;
					const movieSuggestions = response.data[1].movieSuggestions;
					console.log(YTSDetails, movieSuggestions);
					commit('setYTSDetails', YTSDetails);
					commit('setMovieSuggestions', movieSuggestions);
				});
			} catch (err) {
				console.log(err);
			}
		},
	},
};
