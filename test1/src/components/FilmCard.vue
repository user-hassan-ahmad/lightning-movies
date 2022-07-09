<template>
	<div>
		<div
			@mouseover="hover = true"
			@mouseleave="hover = false"
			class="flex flex-col items-center justify-center bg-black text-white"
		>
			<h3 class="text-center px-2">{{ film.Title }}</h3>
			<img :src="film.Poster" />
			<h4>{{ film.Year }}</h4>
		</div>
		<div v-show="hover">
			<FilmDetail :filmDetail="filmDetail" :hover="hover" />
		</div>
	</div>
</template>

<script setup>
	import FilmDetail from './FilmDetail.vue';

	let hover = false;

	defineProps({
		film: Object,
		filmDetail: Object,
	});
</script>

<style lang="scss" scoped></style>
