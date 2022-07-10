<template>
	<div class="flex place-content-center">
		<router-view v-slot="{ Component }">
			<Transition
				enter-active-class="animate__animated animate__zoomInUp"
				leave-active-class="animate__animated animate__zoomOutDown"
				mode="out-in"
			>
				<component :is="Component" />
			</Transition>
		</router-view>
	</div>
</template>

<script setup></script>

<style lang="scss">
	.slide-enter-from,
	.slide-leave-to {
		opacity: 0;
	}

	.slide-enter-active,
	.slide-leave-active {
		transition: opacity 0.3s ease-out;
	}
</style>
