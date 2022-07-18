<template>
	<div class="mt-5 mb-5">
		<div v-for="(post, i) in news" :key="i">
			<div class="p-5 bg-slate-300">
				<a :href="post.url">{{ post.title }}</a>
			</div>
		</div>
	</div>
</template>

<script setup>
	defineProps({
		news: Array,
	});
</script>

<style lang="scss" scoped></style>
