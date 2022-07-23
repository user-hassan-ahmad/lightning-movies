<template>
	<div class="w-full flex flex-wrap md:flex-nowrap mt-5">
		<div class="w-full flex justify-evenly" v-for="post in posts">
			<router-link :to="`/film-page/${post.imdb_code}/`">
				<div class="flex flex-col items-center p-5">
					<div>{{ post.title_english }}</div>
					<div>
						<img
							class="transition-all w-20 hover:w-40"
							:src="post.medium_cover_image"
						/>
					</div>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script setup>
	defineProps({
		posts: Array,
	});
</script>

<style lang="scss" scoped></style>
