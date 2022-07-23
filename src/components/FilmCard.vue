<template>
	<router-link :to="`/film-page/${film.imdbID}/`">
		<div
			@mouseover="hoverActiveDetails(film.imdbID)"
			@mouseleave="hoverState(false)"
			class="h-96 m-2 flip-card"
		>
			<div class="flip-card-inner relative w-full h-full">
				<div
					class="flip-card-front bg-black text-white absolute w-full h-full flex flex-col justify-evenly items-center rounded-lg"
				>
					<h3 class="px-2 text-center">{{ film.Title }}</h3>
					<div class="h-3/4">
						<img class="max-h-full max-w-full" :src="film.Poster" />
					</div>
					<h4>{{ film.Year }}</h4>
				</div>
				<div
					class="flip-card-back bg-blue-900 text-white absolute w-full h-full rounded-lg"
				>
					<FilmDetail :filmDetail="filmDetail" />
				</div>
			</div>
		</div>
	</router-link>
</template>

<script setup>
	import { useStore } from 'vuex';
	import { computed } from 'vue';
	import { ref } from 'vue';
	import FilmDetail from './FilmDetail.vue';

	let hover = ref(false);

	const store = useStore();

	const filmDetail = computed(() => {
		return store.state.omdb.film;
	});

	function hoverActiveDetails(id) {
		store.commit('setFilmID', id);
		store.dispatch('getSpecificFilm');
		hoverState(true);
	}

	function hoverState(bool) {
		hover.value = bool;
		if (bool === false) {
			store.commit('setFilm', {});
		}
	}

	defineProps({
		film: Object,
	});
</script>

<style lang="scss" scoped>
	.bounce-enter-active {
		animation: bounce-in 0.3s;
	}
	@keyframes bounce-in {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.25);
		}
		100% {
			transform: scale(1);
		}
	}

	.flip-card {
		background-color: transparent;
		perspective: 1000px; /* Remove this if you don't want the 3D effect */
	}

	/* This container is needed to position the front and back side */
	.flip-card-inner {
		transition: all 0.3s;
		transform-style: preserve-3d;
	}

	@media (hover: hover) and (pointer: fine) {
		/* Do an horizontal flip when you move the mouse over the flip box container */
		.flip-card:hover .flip-card-inner {
			transform: rotateY(180deg);
		}

		.flip-card:hover .flip-card-back {
			opacity: 1;
		}
	}

	/* Position the front and back side */
	.flip-card-front,
	.flip-card-back {
		-webkit-backface-visibility: hidden; /* Safari */
		backface-visibility: hidden;
	}

	/* Style the front side (fallback if image is missing) */

	/* Style the back side */
	.flip-card-back {
		transition: all ease-out 0.5s;
		opacity: 0;
		transform: rotateY(180deg);
	}
</style>
