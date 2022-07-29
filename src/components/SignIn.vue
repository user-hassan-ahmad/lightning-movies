<template>
	<div class="w-screen h-screen flex justify-center items-center">
		<SideNavExpander />
		<div
			class="w-96 h-96 p-10 rounded-3xl shadow-2xl flex flex-col justify-evenly"
		>
			<h1 class="text-center text-2xl text-black">Sign In</h1>
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
				<div
					class="w-full h-16 my-4 p-2 bg-red-500 rounded-lg text-white flex justify-center items-center"
					v-show="tempVis"
				>
					{{ errMsg }}
				</div>
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
		signInWithEmailAndPassword,
		GoogleAuthProvider,
		signInWithPopup,
	} from 'firebase/auth';
	import { useRouter } from 'vue-router';
	import SideNavExpander from './SideNavExpander.vue';
	const email = ref('');
	const password = ref('');
	const errMsg = ref();
	const tempVis = ref(false);
	const router = useRouter();

	const activateTempVis = () => {
		tempVis.value = true;
		setTimeout(() => (tempVis.value = false), 2000);
	};

	const register = () => {
		signInWithEmailAndPassword(getAuth(), email.value, password.value)
			.then((data) => {
				console.log('successfully registered');
				router.push('/');
			})
			.catch((error) => {
				console.log(error);
				switch (error.code) {
					case 'auth/invalid-email':
						errMsg.value = 'Invalid email';
						activateTempVis();
						break;
					case 'auth/user-not-found':
						errMsg.value = 'No account with that email was found';
						activateTempVis();
						break;
					case 'auth/wrong-password':
						errMsg.value = 'Incorrect password';
						activateTempVis();
						break;
					default:
						errMsg.value = 'Email or password was incorrect';
						break;
				}
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
