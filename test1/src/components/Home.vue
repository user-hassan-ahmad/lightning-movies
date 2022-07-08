<template>
	<div class="bg-black h-fit flex flex-col items-center">
		<h3 class="text-6xl text-white bold flex place-content-center p-5">
			Counter
		</h3>
		<h4 class="text-white">{{ count }} x 2 = {{ double }}</h4>
		<button
			class="flex justify-center items-center h-10 w-20 m-3 bg-white text-black"
			@click="increment"
		>
			Double
		</button>
	</div>
</template>

<script setup>
	import { computed } from 'vue';
	import { useStore } from 'vuex';

	const store = useStore();

	const count = computed(() => {
		return store.state.counter.counter;
	});

	const double = computed(() => {
		return store.getters['times2'];
	});

	const increment = () => {
		return store.commit('increment');
	};
</script>

<style lang="scss" scoped></style>
