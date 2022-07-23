<template>
	<div class="p-10 h-full w-full flex flex-col justify-evenly items-center">
		<router-link to="/"
			><i @click="reset" class="fa-solid fa-cloud-bolt text-6xl"></i
		></router-link>
		<div class="text-4xl text-center mt-5 mb-5">{{ filmDetail.Title }}</div>

		<div class="w-full flex flex-col items-center">
			<div class="w-1/2 flex items-center justify-evenly">
				<div @click="wToggle" class="flex items-center">
					<i class="fa-solid fa-eye text-2xl"></i>
					<div class="hidden sm:flex cursor-pointer m-4">Watch Options</div>
				</div>

				<div @click="sToggle" class="flex items-center">
					<i class="fa-solid fa-lightbulb text-2xl"></i>
					<div class="hidden sm:flex cursor-pointer m-4">Movie Suggestions</div>
				</div>

				<div @click="tToggle" class="flex items-center">
					<i class="fa-solid fa-link text-2xl"></i>
					<div class="hidden sm:flex cursor-pointer m-4">YTS torrents</div>
				</div>
			</div>

			<div class="w-full flex flex-col">
				<Transition
					enter-active-class="animate__animated animate__flipInX"
					leave-active-class="animate__animated animate__flipOutX"
					mode="out-in"
				>
					<FilmWatchGuide v-show="watchToggle" :posts="watchGuide" />
				</Transition>
				<Transition
					enter-active-class="animate__animated animate__flipInX"
					leave-active-class="animate__animated animate__flipOutX"
					mode="out-in"
				>
					<MovieSuggestions
						v-show="suggestionToggle"
						:posts="movieSuggestions"
					/>
				</Transition>
				<Transition
					enter-active-class="animate__animated animate__flipInX"
					leave-active-class="animate__animated animate__flipOutX"
					mode="out-in"
				>
					<FilmYTSTorrents v-show="torrentToggle" :posts="YTSDetails" />
				</Transition>
			</div>
		</div>

		<div
			class="relative flex flex-col items-center sm:flex-row justify-evenly mt-10"
		>
			<div class="p-5">
				<img :src="filmDetail.Poster" alt="film-poster" />
			</div>
			<div class="p-5 w-full sm:w-1/2 flex flex-col justify-evenly">
				<div>
					<span class="font-bold">IMDB Rating:</span>
					{{ filmDetail.imdbRating }} |
					<span class="font-bold">Vote count:</span>
					{{ filmDetail.imdbVotes }} | <span class="font-bold">Runtime:</span>
					{{ filmDetail.Runtime }}
				</div>
				<div>
					<span class="font-bold">Type:</span> {{ filmDetail.Type }} |
					<span class="font-bold">Year:</span> {{ filmDetail.Year }} |
					<span class="font-bold">Rated:</span> {{ filmDetail.Rated }}
				</div>
				<div>
					<span class="font-bold">Awards:</span> {{ filmDetail.Awards }}
				</div>
				<div>
					<span class="font-bold">Main Cast:</span> {{ filmDetail.Actors }}
				</div>
				<div v-if="filmDetail.Type === 'series'">
					<span class="font-bold">Seasons:</span> {{ filmDetail.totalSeasons }}
				</div>

				<div><span class="font-bold"> Genre:</span> {{ filmDetail.Genre }}</div>
				<div>
					<span class="font-bold">Language:</span> {{ filmDetail.Language }}
				</div>
				<p><span class="font-bold">Plot:</span> {{ filmDetail.Plot }}</p>
			</div>
		</div>

		<div
			class="w-3/4 flex flex-col sm:flex-row items-center sm:justify-between mt-10"
		>
			<a class="cursor-pointer text-lg font-bold mb-2" @click="$router.go(-1)"
				>Back</a
			>
			<a
				@click="sendMeTo(filmDetail.imdbID)"
				class="cursor-pointer text-lg font-bold mb-2"
				>Official IMDB Page</a
			>
			<a @click="PGToggle" class="cursor-pointer text-lg font-bold mb-2"
				>Parental Guide</a
			>
		</div>
		<Transition
			enter-active-class="animate__animated animate__fadeInUp"
			leave-active-class="animate__animated animate__fadeOutDown"
			mode="out-in"
		>
			<FilmParentalGuide
				v-show="parentToggle"
				:posts="parentalGuidance"
				:parentToggle="parentToggle"
				@parentToggle="PGToggle"
			/>
		</Transition>
	</div>
</template>

<script setup>
	import { useRoute } from 'vue-router';
	import { ref, onMounted, onUnmounted, computed } from 'vue';
	import { useStore } from 'vuex';
	import FilmParentalGuide from './FilmParentalGuide.vue';
	import FilmWatchGuide from './FilmWatchGuide.vue';
	import MovieSuggestions from './MovieSuggestions.vue';
	import FilmYTSTorrents from './FilmYTSTorrents.vue';

	let parentToggle = ref(false);
	let watchToggle = ref(false);
	let suggestionToggle = ref(false);
	let torrentToggle = ref(false);

	const route = useRoute();

	onMounted(() => {
		const filmId = route.params.id;
		getFilm(filmId);
		store.dispatch('getParentalGuidance');
		store.dispatch('getWatchGuide');
		store.dispatch('getYTSDetails');
	});

	onUnmounted(() => {
		store.commit('setWatchGuide', []);
	});

	const reset = () => {
		store.commit('setFilms', []);
		store.commit('setQuery', '');
		computed(() => {
			return (query = store.state.omdb.query);
		});
		store.commit('setFilm', {});
	};

	const store = useStore();

	function getFilm(id) {
		store.commit('setFilmID', id);
		store.dispatch('getSpecificFilm');
	}

	const filmDetail = computed(() => {
		return store.state.omdb.film;
	});

	const PGToggle = () => {
		parentToggle.value = !parentToggle.value;
	};

	const wToggle = () => {
		watchToggle.value = !watchToggle.value;
		if (watchToggle.value === true) {
			suggestionToggle.value = false;
			torrentToggle.value = false;
		}
	};

	const sToggle = () => {
		suggestionToggle.value = !suggestionToggle.value;
		if (suggestionToggle.value === true) {
			watchToggle.value = false;
			torrentToggle.value = false;
		}
	};

	const tToggle = () => {
		torrentToggle.value = !torrentToggle.value;
		if (torrentToggle.value === true) {
			watchToggle.value = false;
			suggestionToggle.value = false;
		}
	};

	const parentalGuidance = computed(() => {
		return store.state.omdb.parentalGuidance;
	});

	const watchGuide = computed(() => {
		return store.state.omdb.watchGuide;
	});

	const YTSDetails = computed(() => {
		return store.state.omdb.YTSDetails;
	});

	const movieSuggestions = computed(() => {
		return store.state.omdb.movieSuggestions;
	});

	function sendMeTo(id, extension) {
		window.open(
			`https://www.imdb.com/title/${id}/${extension ? `${extension}` : ''}`,
			'_blank'
		);
	}
</script>

<style lang="scss" scoped>
	.animate__flipOutX {
		--animate-duration: 0.1s;
	}
	.animate__flipInX {
		--animate-duration: 0.5s;
	}

	.animate__fadeInUp,
	.animate__fadeOutDown {
		--animate-duration: 0.3s;
	}
</style>
