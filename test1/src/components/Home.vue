<template>
	<div class="flex flex-col items-center">
		<div class="bg-black h-fit flex flex-col items-center">
			<h3 class="text-6xl text-white bold flex place-content-center p-5">
				Welcome
			</h3>
			<button
				class="flex justify-center items-center h-10 w-3/4 rounded m-3 bg-white text-black"
				@click="getNews"
			>
				Get Latest News
			</button>
		</div>
		<Transition
			enter-active-class="animate__animated animate__fadeInUpBig"
			leave-active-class="animate__animated animate__fadeOutDownBig"
			mode="out-in"
		>
			<div v-show="newsStatus" class="">
				<News :news="news" />
			</div>
		</Transition>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue';
	import { useStore } from 'vuex';
	import News from './News.vue';

	const store = useStore();
	let newsStatus = ref(false);

	const news = computed(() => {
		return store.state.news.articles;
	});

	const getNews = () => {
		store.dispatch('getNewsArticles');
		newsStatus.value = !newsStatus.value;
	};

	onMounted(() => {
		getNews();
	});
</script>

<style lang="scss" scoped>
	.animate__animated.animate__fadeInLeft,
	.animate__animated.animate__fadeOutRight {
		--animate-duration: 0.4s;
	}
</style>
