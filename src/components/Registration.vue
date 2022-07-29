<template>
	<div class="w-screen h-screen flex justify-center items-center">
		<SideNavExpander />
		<div
			class="w-96 h-96 p-10 rounded-3xl shadow-2xl flex flex-col justify-evenly"
		>
			<h1 class="text-center text-2xl text-black">Create an account</h1>
			<div class="w-full flex flex-col items-center">
				<p class="w-full my-4">
					<input
						class="w-full p-4 rounded-3xl bg-green-100 focus:bg-green-300 focus:outline-none"
						type="text"
						placeholder="Email"
						v-model="email"
					/>
				</p>
				<p class="w-full my-4">
					<input
						class="w-full p-4 rounded-3xl bg-green-100 focus:bg-green-300 focus:outline-none"
						type="password"
						placeholder="Password"
						v-model="password"
					/>
				</p>
			</div>

			<div class="flex justify-evenly">
				<button
					class="w-1/3 p-2 bg-black text-white rounded-3xl"
					@click="register"
				>
					Submit
				</button>
				<button
					class="w-1/3 p-2 bg-black text-white rounded-3xl"
					@click="signInWithGoogle"
				>
					<i class="fa-brands fa-google"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import {
		getAuth,
		createUserWithEmailAndPassword,
		GoogleAuthProvider,
		signInWithPopup,
	} from 'firebase/auth';
	import { useRouter } from 'vue-router';
	import SideNavExpander from './SideNavExpander.vue';

	const email = ref('');
	const password = ref('');
	const router = useRouter();

	const register = () => {
		createUserWithEmailAndPassword(getAuth(), email.value, password.value)
			.then((data) => {
				console.log('successfully registered');
				router.push('/');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(getAuth(), provider)
			.then((result) => {
				console.log('successfully registered');
				console.log(result.user);
				router.push('/');
			})
			.catch((error) => {
				console.log(error);
			});
	};
</script>

<style lang="scss" scoped></style>
