<template>
	<div class="flex place-content-center">
		<router-view v-slot="{ Component }">
			<Transition
				enter-active-class="animate__animated animate__fadeInLeft"
				leave-active-class="animate__animated animate__fadeOutRight"
				mode="out-in"
			>
				<component :is="Component" />
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
</style>
