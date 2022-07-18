<template>
	<div class="flex flex-col w-3/4 mt-10 bg-slate-200 p-10 rounded">
		<div v-for="(post, i) in posts" :key="i">
			<div class="flex flex-col">
				<div class="bg-indigo-300 w-fit p-2 mb-2 rounded">
					<span class="font-bold">{{ post.title }}</span> :
					<span class="decoration-neutral-700">{{ post.category }}</span>
				</div>

				<div class="mb-5">
					<div class="mb-2" v-for="(item, i) in post.descList" :key="i">
						<div>"{{ item }}"</div>
					</div>
				</div>
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
