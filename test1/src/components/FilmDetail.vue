<template>
	<Transition name="fade">
		<div v-show="hover" class="expander">
			<div>IMDB vote count: {{ filmDetail.imdbVotes }}</div>
			<div>Genre: {{ filmDetail.Genre }}</div>
			<div>Language: {{ filmDetail.Language }}</div>
			<div>Plot: {{ filmDetail.Plot }}</div>
		</div>
	</Transition>
</template>

<script setup>
	defineProps({
		filmDetail: Object,
		hover: Boolean,
	});
</script>

<style lang="scss" scoped>
	.expander {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-evenly;
		height: 100%;
		width: 200%;
		background-color: black;
		color: white;
		top: 0;
		left: 110%;
		z-index: 100;
		padding: 10px;
	}
	.fade-enter-active {
		animation: bounce-in 0.5s;
		transition: all 0.5s ease-in-out;
	}
	.fade-leave-active {
		animation: bounce-in 0.5s reverse;
		transition: all 0.5s ease-in-out;
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
		opacity: 0;
	}
</style>
