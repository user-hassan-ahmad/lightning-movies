<template>
	<div class="h-full w-full p-2 text-sm">
		<div
			v-if="Object.keys(filmDetail).length === 0"
			class="h-full w-full flex flex-col justify-evenly items-center text-6xl"
		>
			...
		</div>
		<div v-else class="h-full flex flex-col justify-evenly">
			<div>Type: {{ filmDetail.Type }}</div>
			<div>
				IMDB Rating: {{ filmDetail.imdbRating }} | vote count:
				{{ filmDetail.imdbVotes }}
			</div>
			<div>Runtime: {{ filmDetail.Runtime }}</div>
			<div>Genre: {{ filmDetail.Genre }}</div>
			<div>Language: {{ filmDetail.Language }}</div>
			<div>Plot: {{ filmDetail.Plot }}</div>
		</div>
	</div>
</template>

<script setup>
	defineProps({
		filmDetail: Object,
	});
</script>

<style lang="scss" scoped></style>
