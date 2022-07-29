<template>
	<div class="w-full h-screen flex flex-col items-center">
		<SideNavExpander />
		<router-link to="/"
			><i @click="reset" class="fa-solid fa-cloud-bolt text-6xl pt-10"></i
		></router-link>
		<div class="text-3xl pt-10">Watch List</div>
		<div
			v-if="filmData.length === 0"
			class="h-full flex flex-col items-center justify-center pt-10 text-6xl"
		>
			<i class="fa-solid fa-battery-empty"></i>
			<p class="text-lg">Go and charge up your list!</p>
		</div>
		<div class="w-full pt-10 flex flex-row flex-wrap justify-evenly">
			<div v-for="data in filmData" :key="data.id">
				<div class="w-40 space-x-5 flex flex-col">
					<div class="flex justify-between">
						<div>
							<i
								@click="removeWatchList(data.id)"
								class="fa-solid fa-circle-minus text-lg cursor-pointer"
							></i>
						</div>
						<div class="text-black">
							{{ data.rating }}
							<span
								class="before:h-16 before:w-10 before:-top-8 before:-left-2 before:-z-10 before:absolute before:-inset-1 before:-skew-y-8 before:bg-green-200 relative flex"
							></span>
						</div>
					</div>
					<router-link :to="`/film-page/${data.id}`"
						><div><img :src="data.img" /></div
					></router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		collection,
		doc,
		deleteDoc,
		query,
		onSnapshot,
	} from 'firebase/firestore';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { db } from '../main';
	import { ref, onMounted } from 'vue';
	import SideNavExpander from './SideNavExpander.vue';

	let isSignedIn = ref(false);
	let filmData = ref([]);

	onMounted(() => {
		let auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				isSignedIn.value = true;
				const q = query(collection(db, user.uid));
				const unsubscribe = onSnapshot(q, (querySnapshot) => {
					filmData.value = [];
					querySnapshot.forEach((doc) => {
						const id = doc.data().filmID;
						const title = doc.data().filmName;
						const rating = doc.data().filmIMDB;
						const img = doc.data().filmPoster;
						filmData.value.push({ id, title, rating, img });
					});
				});
			} else {
				isSignedIn.value = false;
			}
		});
	});

	const removeWatchList = (filmID) => {
		let auth = getAuth();
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				isSignedIn.value = true;
				deleteDoc(doc(db, user.uid, filmID));
			} else {
				isSignedIn.value = false;
			}
		});
	};
</script>

<style lang="scss" scoped></style>
