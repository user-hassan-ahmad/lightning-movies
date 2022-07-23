<template>
	<div class="expander">
		<div
			v-if="Object.keys(filmDetail).length === 0"
			class="h-full w-full flex flex-col justify-evenly items-center"
		>
			LOADING...
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

<style lang="scss" scoped>
	.expander {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-evenly;
		height: 50vh;
		width: 200%;
		background-color: black;
		color: white;
		font-size: 0.8vw;
		top: -30%;
		left: 110%;
		z-index: 100;
		padding: 10px;
		border-radius: 10px;
	}
</style>
