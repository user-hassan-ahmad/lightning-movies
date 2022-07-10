<template>
	<div class="h-screen w-screen flex flex-col justify-evenly items-center">
		<div class="text-4xl text-center">{{ filmDetail.Title }}</div>
		<div class="flex justify-center">
			<div class="p-5">
				<img :src="filmDetail.Poster" alt="film-poster" />
			</div>
			<div class="p-5 w-1/2 flex flex-col justify-evenly">
				<div>
					<span class="font-bold">IMDB Rating:</span>
					{{ filmDetail.imdbRating }} |
					<span class="font-bold">Vote count:</span>
					{{ filmDetail.imdbVotes }} | <span class="font-bold">Runtime:</span>
					{{ filmDetail.Runtime }}
				</div>

				<div><span class="font-bold"> Genre:</span> {{ filmDetail.Genre }}</div>
				<div>
					<span class="font-bold">Language:</span> {{ filmDetail.Language }}
				</div>
				<p><span class="font-bold">Plot:</span> {{ filmDetail.Plot }}</p>
			</div>
		</div>

		<a class="cursor-pointer text-lg font-bold" @click="$router.go(-1)">back</a>
	</div>
</template>

<script setup>
	import { useRoute } from 'vue-router';
	import { onMounted, computed } from 'vue';
	import { useStore } from 'vuex';

	const route = useRoute();

	onMounted(() => {
		const filmId = route.params.id;
		getSpecificFilm(filmId);
	});

	const store = useStore();

	function getSpecificFilm(id) {
		store.commit('setFilmID', id);
		store.dispatch('getSpecificFilm');
	}

	const filmDetail = computed(() => {
		return store.state.omdb.film;
	});
</script>

<style lang="scss" scoped></style>
