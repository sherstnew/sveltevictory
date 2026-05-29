<script lang="ts">
	import cloud from '$lib/assets/objects/cloud.webp';
	import cloudsBlock from '$lib/assets/objects/clouds.png';

	let {
		cloudsLayer = $bindable<HTMLElement>(),
		clouds = $bindable<HTMLElement[]>([]),
		cloudsTrigger = $bindable<HTMLElement>()
	} = $props();
</script>

<div
	class="clouds pointer-events-none fixed top-0 z-20 hidden h-screen w-screen flex-wrap items-center justify-center"
	bind:this={cloudsLayer}
>
	{#each { length: 8 } as _, i (i)}
		<img
			src={cloud}
			alt="Облако"
			class="cloud pointer-events-none z-20 scale-200 opacity-0"
			bind:this={clouds[i]}
		/>
	{/each}
</div>
<img
	src={cloudsBlock}
	alt=""
	class="bg-clouds image-fade-y pointer-events-none z-10 -mt-50 -mb-50 w-screen snap-center"
	bind:this={cloudsTrigger}
/>
