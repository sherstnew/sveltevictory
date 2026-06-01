<script lang="ts">
	import stones1Image from '$lib/assets/objects/0-stones-1.avif';
	import stones2Image from '$lib/assets/objects/0-stones-2.avif';

	let {
		stonesLayer = $bindable<HTMLElement>(),
		stones1 = $bindable<HTMLElement>(),
		stones2 = $bindable<HTMLElement>()
	} = $props();
</script>

<div class="stones-layer pointer-events-none fixed top-0 z-20 hidden" bind:this={stonesLayer}>
	<img
		src={stones1Image}
		alt=""
		class="stones1 w-1/2"
		bind:this={stones1}
		loading="eager"
		fetchpriority="high"
		decoding="async"
	/>
	<img
		src={stones2Image}
		alt=""
		class="stones2 w-1/2"
		bind:this={stones2}
		loading="eager"
		fetchpriority="high"
		decoding="async"
	/>
</div>
