import axios from 'axios';

export default {
	state: {
		counter: 10,
	},
	getters: {
		times2: (state) => {
			return state.counter * 2;
		},
	},
	mutations: {
		updateValue(state, payload) {
			state.counter = payload;
		},
		increment(state) {
			state.counter++;
		},
	},
	actions: {
		updateValue({ commit, getters }, payload) {
			commit('updateValue', payload);
		},
	},
};
