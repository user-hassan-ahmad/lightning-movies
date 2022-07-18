<template>
	<div class="w-full flex justify-evenly mt-5">
		<div v-if="posts.torrents === undefined">
			<h3 class="font-bold">Couldn't find anything, sorry!</h3>
		</div>
		<div class="w-full" v-for="(post, i) in posts.torrents" :key="i">
			<div class="flex w-full justify-center">
				<a :href="post.url"
					><i class="fa-solid fa-file-arrow-down text-6xl mr-5"></i
				></a>
				<div>
					<div>{{ post.type }} {{ post.quality }}</div>
					<div>
						<span class="font-bold">Seeds:</span> {{ post.seeds }} |
						<span class="font-bold">Peers:</span> {{ post.peers }}
					</div>
					<div><span class="font-bold">File Size:</span> {{ post.size }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	defineProps({
		posts: Object,
	});
</script>

<style lang="scss" scoped></style>
