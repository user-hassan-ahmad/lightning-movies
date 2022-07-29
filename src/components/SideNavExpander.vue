<template>
	<div>
		<div
			v-if="!expanded"
			@click="openMenu"
			class="fixed top-5 left-5 w-12 h-12 z-50 bg-black text-white text-2xl rounded-full flex justify-center items-center transition-all duration-300 ease-in-out hover:rotate-180 hover:bg-green-600 hover:cursor-pointer"
		>
			<i class="fa-solid fa-bolt"></i>
		</div>
		<div
			v-else="expanded"
			class="fixed top-5 left-5 w-12 h-12 z-50 bg-black text-white text-2xl rounded-full flex justify-center items-center transition-all duration-300 ease-in-out hover:rotate-180 hover:bg-green-600 hover:cursor-pointer"
		>
			<i class="fa-solid fa-xmark"></i>
		</div>
		<Transition
			v-show="expanded"
			enter-active-class="animate__animated animate__fadeInLeft nav"
			leave-active-class="animate__animated animate__fadeOutLeft nav"
			mode="out-in"
		>
			<SideNav v-on-click-outside="closeMenu" />
		</Transition>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import SideNav from './SideNav.vue';
	import { vOnClickOutside } from '@vueuse/components';
	let expanded = ref(false);

	function openMenu() {
		expanded.value = true;
	}

	function closeMenu() {
		expanded.value = false;
	}
</script>

<style lang="scss" scoped>
	.animate__animated.nav {
		animation-duration: 0.3s;
	}
</style>
