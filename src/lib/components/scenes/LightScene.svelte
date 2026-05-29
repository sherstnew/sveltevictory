<script lang="ts">
	import darkTexture from '$lib/assets/textures/dark-texture.png';
	import viking4 from '$lib/assets/story/4.png';
	import viking5 from '$lib/assets/story/5.png';
	import viking6 from '$lib/assets/story/6.png';
	import viking7Image from '$lib/assets/story/7.png';

	let {
		lightScreen = $bindable<HTMLElement>(),
		lightSection = $bindable<HTMLElement>(),
		light = $bindable<HTMLElement>(),
		viking6LightMask = $bindable<HTMLElement>(),
		viking7 = $bindable<HTMLElement>()
	} = $props();
</script>

<div class="w-screen bg-[#191511]">
	<img src={darkTexture} alt="" class="image-fade-bottom h-screen w-screen" />
	<img
		src={viking4}
		alt=""
		class="bg-viking-4 image-fade-both pointer-events-none h-screen snap-start"
	/>
	<img
		src={viking5}
		alt=""
		class="bg-viking-5 image-fade-top pointer-events-none h-screen snap-start"
	/>
	<div class="viking-6-scene pointer-events-none relative h-screen w-screen snap-start">
		<img src={viking6} alt="" class="bg-viking-6 h-screen" />
		<div
			class="viking-6-light-mask pointer-events-none absolute top-0 h-full w-full bg-transparent"
			bind:this={viking6LightMask}
		></div>
		<div
			class="light pointer-events-none absolute top-[31%] left-[64%] z-20 size-10 rounded-full opacity-0"
			bind:this={light}
		></div>
	</div>
	<div
		class="light-section pointer-events-none fixed top-0 hidden h-screen w-screen bg-transparent"
		bind:this={lightSection}
	></div>
</div>
<div class="light-screen h-screen w-screen snap-start bg-black" bind:this={lightScreen}>
	<img
		src={viking7Image}
		alt=""
		class="bg-viking-7 image-fade-both pointer-events-none h-screen opacity-0"
		bind:this={viking7}
	/>
</div>

<style>
	.light {
		background: radial-gradient(
			circle,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 0.6) 40%,
			rgba(255, 255, 255, 0.1) 70%,
			transparent 100%
		);
	}
</style>
