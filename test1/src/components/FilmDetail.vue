<template>
	<div>
		{{ filmDetail.imdbRating }}
	</div>
</template>

<script setup>
	defineProps({
		filmDetail: Object,
	});
</script>

<style lang="scss" scoped></style>
