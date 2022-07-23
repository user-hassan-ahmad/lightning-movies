<template>
	<div class="w-full sm:w-3/4 flex flex-col justify-between items-center">
		<div class="w-full mt-10 flex justify-center items-center">
			<router-link to="/"
				><i @click="reset" class="fa-solid fa-cloud-bolt text-9xl"></i
			></router-link>
		</div>
		<div class="w-3/4 flex flex-col justify-center items-center">
			<input
				type="text"
				class="shadow appearance-none border rounded w-full py-2 px-3 my-10 text-gray-700 text-center leading-tight focus:outline-none focus:shadow-outline"
				placeholder="search movie title..."
				v-model="query"
				v-on:keyup="getFilms"
				v-focus
			/>

			<div
				v-if="totalResults > 0"
				class="w-full flex flex-col place-content-between text-black my-5 sm:flex-row"
			>
				<div class="flex flex-col items-center sm:hidden">
					<div class="w-full flex justify-between">
						<i
							@click="downPage"
							class="fa-solid fa-arrow-left hover:cursor-pointer"
						></i>
						<h5>Total Results: {{ totalResults }}</h5>
						<i
							@click="upPage"
							class="fa-solid fa-arrow-right hover:cursor-pointer"
						></i>
					</div>
					<div>
						<h5>Page: {{ pageNo }}</h5>
					</div>
				</div>

				<div class="hidden sm:w-full sm:flex sm:justify-between">
					<i
						@click="downPage"
						class="fa-solid fa-arrow-left hover:cursor-pointer"
					></i>
					<h5>Total Results: {{ totalResults }}</h5>
					<h5>Page: {{ pageNo }}</h5>
					<i
						@click="upPage"
						class="fa-solid fa-arrow-right hover:cursor-pointer"
					></i>
				</div>
			</div>

			<div
				v-if="totalResults > 0"
				class="w-full h-20 overflow-y-scroll flex flex-wrap space-x-3 justify-center sm:h-40"
			>
				<div
					v-if="totalResults > 0"
					class="hover:cursor-pointer"
					v-for="(page, i) in totalPages"
					:key="i"
					@click="selectPage(page)"
				>
					{{ page }}
				</div>
			</div>

			<div class="mt-10 w-full flex flex-wrap justify-evenly">
				<div
					class="w-9/12 sm:w-6/12 lg:w-4/12 h-fit"
					v-for="(film, index) in films"
					:key="film.imdbID"
					:id="`${film.imdbID}`"
				>
					<FilmCard :film="film" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import FilmCard from './FilmCard.vue';
	import { computed, ref } from 'vue';
	import { useStore } from 'vuex';

	let query = ref('');

	const store = useStore();

	const films = computed(() => {
		return store.state.omdb.films;
	});

	const totalResults = computed(() => {
		return store.state.omdb.totalResults;
	});

	const pageNo = computed(() => {
		return store.state.omdb.page;
	});
	const totalPages = computed(() => {
		return store.state.omdb.totalPages;
	});

	const vFocus = {
		mounted: (el) => {
			el.focus();
		},
	};

	const reset = () => {
		store.commit('setFilms', []);
		store.commit('setQuery', '');
		computed(() => {
			return (query = store.state.omdb.query);
		});
		store.commit('setFilm', {});
	};

	const selectPage = (page) => {
		store.commit('setPage', page);
		store.dispatch('getFilms');
		store.commit('setFilm', {});
	};
	const downPage = () => {
		store.commit('downPage');
		store.dispatch('getFilms');
		store.commit('setFilm', {});
	};
	const upPage = () => {
		store.commit('upPage');
		store.dispatch('getFilms');
		store.commit('setFilm', {});
	};

	const getFilms = () => {
		store.commit('setPage', 1);
		store.commit('setQuery', query);
		store.dispatch('getFilms');
	};
</script>

<style lang="scss" scoped></style>
