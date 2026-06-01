<script lang="ts">
	import jetaLogo from '$lib/assets/jeta.avif';
	import viking0 from '$lib/assets/story/0.avif';
	import viking1Image from '$lib/assets/story/1.avif';

	let { viking1 = $bindable<HTMLElement>() } = $props();
</script>

<div class="relative flex h-screen w-screen snap-start flex-col items-center">
	<img
		src={jetaLogo}
		alt=""
		width="640"
		height="960"
		class="relative z-10 mt-20 w-40 drop-shadow-2xl drop-shadow-amber-600"
		loading="eager"
		fetchpriority="high"
		decoding="async"
	/>
	<header class="intro-title z-10 font-runic text-8xl font-bold drop-shadow-svelte">
		свелтпобеда.рф
	</header>
	<img
		src={viking0}
		alt=""
		width="1870"
		height="841"
		class="bg-viking-0 image-fade-y pointer-events-none absolute top-0 h-full w-screen object-cover"
		loading="eager"
		fetchpriority="high"
		decoding="async"
	/>
</div>
<img
	src={viking1Image}
	alt=""
	width="1870"
	height="841"
	class="bg-viking-1 image-fade-y h-screen w-screen snap-start object-cover"
	bind:this={viking1}
	loading="lazy"
	decoding="async"
/>

<style>
	.intro-title {
		opacity: 0;
		transform: translateY(0.8rem) scale(0.985);
		animation: intro-title-in 1.1s 0.28s ease-out forwards;
	}

	@keyframes intro-title-in {
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.intro-title {
			opacity: 1;
			transform: none;
			animation: none;
		}
	}
</style>
