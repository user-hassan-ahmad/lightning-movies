<template>
	<div
		class="navbar fixed top-5 left-28 w-72 z-40 bg-black text-white flex flex-col rounded-3xl overflow-hidden"
	>
		<div
			@click="handleSignOut"
			v-if="isSignedIn"
			class="hover:bg-green-600 cursor-pointer h-16 p-4 transition-all duration-300 ease-in-out"
		>
			Sign Out
		</div>
		<div v-else class="flex flex-col">
			<router-link
				to="/sign-in"
				class="hover:bg-green-600 h-16 p-4 transition-all duration-300 ease-in-out"
				><div>Sign In</div></router-link
			>
			<router-link
				to="/register"
				class="hover:bg-green-600 h-16 p-4 transition-all duration-300 ease-in-out"
				><div>Register</div></router-link
			>
		</div>
		<div
			v-for="(item, i) in menuItems"
			:key="i"
			class="hover:bg-green-600 h-16 p-4 transition-all duration-300 ease-in-out"
		>
			<router-link :to="item.link"
				><div class="w-full h-full">{{ item.name }}</div></router-link
			>
		</div>
		<div
			v-if="isSignedIn"
			v-for="(item, i) in menuItemsSignedIn"
			:key="i"
			class="hover:bg-green-600 h-16 p-4 transition-all duration-300 ease-in-out"
		>
			<router-link :to="item.link"
				><div class="w-full h-full">{{ item.name }}</div></router-link
			>
		</div>
		<hr />
		<div v-if="!isSignedIn" class="p-4 w-full h-full flex items-center">
			Sign in to get extra features such as your watch list
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import { useRouter } from 'vue-router';
	import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

	const menuItems = [
		{
			name: 'Home',
			link: '/',
		},
	];

	const menuItemsSignedIn = [
		{
			name: 'Watch List',
			link: '/watch-list',
		},
	];

	const isSignedIn = ref(false);
	const router = useRouter();

	let auth;
	onMounted(() => {
		auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				isSignedIn.value = true;
			} else {
				isSignedIn.value = false;
			}
		});
	});

	const handleSignOut = () => {
		signOut(auth).then(() => {
			router.push('/');
		});
	};
</script>

<style lang="scss" scoped>
	.navbar {
		height: 40vh;
	}
</style>
