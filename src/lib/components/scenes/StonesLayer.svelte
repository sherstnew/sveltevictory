<script lang="ts">
	import stones1Image from '$lib/assets/objects/0-stones-1.avif';
	import stones2Image from '$lib/assets/objects/0-stones-2.avif';

	let {
		stonesLayer = $bindable<HTMLElement>(),
		stones1 = $bindable<HTMLElement>(),
		stones2 = $bindable<HTMLElement>()
	} = $props();
</script>

<div
	class="stones-layer pointer-events-none fixed inset-0 z-20 hidden h-screen w-screen items-start justify-between overflow-hidden"
	bind:this={stonesLayer}
>
	<img
		src={stones1Image}
		alt=""
		width="768"
		height="1024"
		class="stones1 h-screen w-auto max-w-none origin-top-left object-contain"
		bind:this={stones1}
		loading="eager"
		fetchpriority="high"
		decoding="async"
	/>
	<img
		src={stones2Image}
		alt=""
		width="768"
		height="1024"
		class="stones2 h-screen w-auto max-w-none origin-top-right object-contain"
		bind:this={stones2}
		loading="eager"
		fetchpriority="high"
		decoding="async"
	/>
</div>
