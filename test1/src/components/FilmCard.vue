<template>
	<div>
		<div
			@mouseover="hoverActiveDetails(film.imdbID)"
			@mouseleave="hoverInactive"
			class="flex flex-col items-center justify-center bg-black text-white"
		>
			<h3 class="text-center px-2">{{ film.Title }}</h3>
			<img :src="film.Poster" />
			<h4>{{ film.Year }}</h4>
		</div>
		<div>
			<Transition name="fade">
				<FilmDetail v-show="hover" :filmDetail="filmDetail" />
			</Transition>
		</div>
	</div>
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
		hover.value = true;
	}

	function hoverInactive() {
		hover.value = false;
		store.commit('setFilm', {});
	}

	defineProps({
		film: Object,
	});
</script>

<style lang="scss" scoped>
	.fade-enter-active {
		animation: bounce-in 0.3s;
	}
	.fade-leave-active {
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

	.fade-enter-from,
	.fade-leave-to {
	}
</style>
