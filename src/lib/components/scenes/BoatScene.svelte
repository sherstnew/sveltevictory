<script lang="ts">
	import boatImage from '$lib/assets/objects/boat.png';
	import waterTexture from '$lib/assets/textures/water.png';
	import viking2 from '$lib/assets/story/2.png';

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
	class="bg-viking-2 image-fade-y pointer-events-none h-screen snap-start"
/>
<img
	src={waterTexture}
	alt=""
	class="water image-fade-y pointer-events-none h-screen snap-start"
	bind:this={water}
/>
