<script lang="ts">
	import jetaLogo from '$lib/assets/jeta.png';
	import viking0 from '$lib/assets/story/0.png';
	import viking1Image from '$lib/assets/story/1.png';

	let { viking1 = $bindable<HTMLElement>() } = $props();
</script>

<div class="relative flex h-screen w-screen snap-start flex-col items-center">
	<img
		src={jetaLogo}
		alt=""
		class="relative z-10 mt-20 w-40 drop-shadow-2xl drop-shadow-amber-600"
	/>
	<header class="z-10 font-runic text-8xl font-bold drop-shadow-svelte">свелтпобеда.рф</header>
	<img
		src={viking0}
		alt=""
		class="bg-viking-0 image-fade-y pointer-events-none absolute top-0 h-full"
	/>
</div>
<img
	src={viking1Image}
	alt=""
	class="bg-viking-1 image-fade-y h-screen snap-start"
	bind:this={viking1}
/>
