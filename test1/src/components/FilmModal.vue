<template>
	<transition name="modal-animation">
		<div>
			<div
				v-show="filmDetail.imdbRating"
				class="modal transition-opacity duration-200 opacity-0 absolute h-1/4 w-full top-1/4 bg-white invisible"
			>
				<transition name="modal-inner">
					<div class="modal-inner">
						<h3>IMDB Rating: {{ filmDetail.imdbRating }}</h3>
					</div>
				</transition>
			</div>
		</div>
	</transition>
</template>

<script setup>
	defineProps({
		filmDetail: Object,
	});
</script>

<style lang="css" scoped></style>
