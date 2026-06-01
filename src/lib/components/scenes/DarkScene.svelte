<script lang="ts">
	import darkTextureImage from '$lib/assets/textures/dark-texture.avif';
	import viking3 from '$lib/assets/story/3.avif';

	let { darkScene = $bindable<HTMLElement>(), darkTexture = $bindable<HTMLElement>() } = $props();
</script>

<div
	class="viking-3-section relative flex h-screen w-screen snap-start justify-center"
	bind:this={darkScene}
>
	<img src={viking3} alt="" class="bg-viking-3 pointer-events-none h-screen w-auto" />
	<img
		src={darkTextureImage}
		alt=""
		class="dark-texture pointer-events-none absolute inset-0 h-screen w-screen"
		bind:this={darkTexture}
	/>
</div>

<style>
	.viking-3-section {
		background: linear-gradient(to bottom, #fae8d5 0%, #fae8d5 80%, #1b1715 100%);
	}
	.dark-texture {
		--circle-x: 55%;
		--circle-y: 45%;
		--circle-r: 100vw;

		-webkit-mask-image: radial-gradient(
			circle var(--circle-r) at var(--circle-x) var(--circle-y),
			transparent 0 var(--circle-r),
			black calc(var(--circle-r) + 1px)
		);

		mask-image: radial-gradient(
			circle var(--circle-r) at var(--circle-x) var(--circle-y),
			transparent 0 var(--circle-r),
			black calc(var(--circle-r) + 1px)
		);
	}
</style>
