<template>
	<div class="flex place-content-center h-full">
		<router-view v-slot="{ Component }">
			<Transition
				enter-active-class="animate__animated animate__fadeInLeft"
				leave-active-class="animate__animated animate__fadeOutRight"
				mode="out-in"
			>
				<component :is="Component" :key="$route.path" />
			</Transition>
		</router-view>
	</div>
</template>

<script setup></script>

<style lang="scss">
	.animate__animated.animate__fadeInLeft,
	.animate__animated.animate__fadeOutRight {
		--animate-duration: 0.4s;
	}

	#app {
		min-height: fit-content;
	}
</style>
