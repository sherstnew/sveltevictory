<script lang="ts">
	import boatImage from '$lib/assets/objects/boat.avif';
	import waterTexture from '$lib/assets/textures/water.avif';
	import viking2 from '$lib/assets/story/2.avif';

	let { boat = $bindable<HTMLElement>(), water = $bindable<HTMLElement>() } = $props();
</script>

<img
	src={boatImage}
	alt=""
	class="boat pointer-events-none fixed -top-full z-20 hidden h-screen drop-shadow-2xl drop-shadow-black"
	bind:this={boat}
/>
<img
	src={viking2}
	alt=""
	width="1870"
	height="841"
	class="bg-viking-2 image-fade-y pointer-events-none h-screen w-screen snap-start object-cover"
	loading="lazy"
	decoding="async"
/>
<img
	src={waterTexture}
	alt=""
	width="2059"
	height="941"
	class="water image-fade-y pointer-events-none h-screen w-screen snap-start object-cover"
	bind:this={water}
	loading="lazy"
	decoding="async"
/>
