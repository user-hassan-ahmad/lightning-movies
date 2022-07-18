<template>
	<div class="mt-5 w-full flex justify-center">
		<div v-if="posts.length === 0">
			<h3 class="font-bold">Couldn't find anything, sorry!</h3>
		</div>
		<div v-for="(post, i) in posts" :key="i" class="flex justify-center w-1/4">
			<div class="flex flex-col items-center w-3/4">
				<div>
					<a :href="post.watch_link"><img :src="post.watch_platform_img" /></a>
				</div>
				<div>{{ post.watch_platform_title }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	defineProps({
		posts: Array,
	});
</script>

<style lang="scss" scoped></style>
