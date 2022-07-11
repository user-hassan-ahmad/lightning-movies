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
				<div><span class="font-bold">Type:</span> {{ filmDetail.Type }}</div>
				<div><span class="font-bold">Year:</span> {{ filmDetail.Year }}</div>
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

		<div class="w-3/4 flex justify-between">
			<a class="cursor-pointer text-lg font-bold" @click="$router.go(-1)"
				>Back</a
			>
			<a
				@click="sendMeTo(filmDetail.imdbID)"
				class="cursor-pointer text-lg font-bold"
				>Official IMDB Page</a
			>
			<a
				@click="sendMeTo(filmDetail.imdbID, 'parentalguide')"
				class="cursor-pointer text-lg font-bold"
				>Parental Guide</a
			>
		</div>
	</div>
</template>

<script setup>
	import { useRoute } from 'vue-router';
	import { onMounted, computed } from 'vue';
	import { useStore } from 'vuex';

	const route = useRoute();

	onMounted(() => {
		const filmId = route.params.id;
		getFilm(filmId);
	});

	const store = useStore();

	function getFilm(id) {
		store.commit('setFilmID', id);
		store.dispatch('getSpecificFilm');
	}

	const filmDetail = computed(() => {
		return store.state.omdb.film;
	});

	function sendMeTo(id, extension) {
		window.open(
			`https://www.imdb.com/title/${id}/${extension ? `${extension}` : ''}`,
			'_blank'
		);
	}
</script>

<style lang="scss" scoped></style>
