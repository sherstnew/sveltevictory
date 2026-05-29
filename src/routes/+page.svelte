<script lang="ts">
	import { onMount } from 'svelte';
	import { setupHomeAnimations } from '$lib/animations/home';
	import SvelteVictory from '$lib/components/svelte-victory.svelte';
	import Memes from '$lib/components/memes.svelte';
	import BoatScene from '$lib/components/scenes/BoatScene.svelte';
	import CloudsScene from '$lib/components/scenes/CloudsScene.svelte';
	import DarkScene from '$lib/components/scenes/DarkScene.svelte';
	import IntroScene from '$lib/components/scenes/IntroScene.svelte';
	import LightScene from '$lib/components/scenes/LightScene.svelte';
	import StonesLayer from '$lib/components/scenes/StonesLayer.svelte';

	let stones1 = $state<HTMLElement>();
	let stones2 = $state<HTMLElement>();
	let viking1 = $state<HTMLElement>();
	let cloudsLayer = $state<HTMLElement>();
	let clouds = $state<HTMLElement[]>([]);
	let cloudsTrigger = $state<HTMLElement>();
	let boat = $state<HTMLElement>();
	let water = $state<HTMLElement>();
	let darkTexture = $state<HTMLElement>();
	let darkScene = $state<HTMLElement>();
	let lightScreen = $state<HTMLElement>();
	let lightSection = $state<HTMLElement>();
	let light = $state<HTMLElement>();
	let viking6LightMask = $state<HTMLElement>();
	let viking7 = $state<HTMLElement>();
	let svelteVictory = $state<HTMLElement>();

	onMount(() => {
		return setupHomeAnimations({
			stones1: stones1!,
			stones2: stones2!,
			viking1: viking1!,
			cloudsLayer: cloudsLayer!,
			clouds,
			cloudsTrigger: cloudsTrigger!,
			boat: boat!,
			water: water!,
			darkTexture: darkTexture!,
			darkScene: darkScene!,
			lightScreen: lightScreen!,
			lightSection: lightSection!,
			light: light!,
			viking6LightMask: viking6LightMask!,
			viking7: viking7!,
			svelteVictory: svelteVictory!
		});
	});
</script>

<div class="gallery flex flex-col items-center bg-[#FAE8D5]">
	<StonesLayer bind:stones1 bind:stones2 />
	<IntroScene bind:viking1 />
	<CloudsScene bind:cloudsLayer bind:clouds bind:cloudsTrigger />
	<BoatScene bind:boat bind:water />
	<DarkScene bind:darkScene bind:darkTexture />
</div>
<LightScene bind:lightScreen bind:lightSection bind:light bind:viking6LightMask bind:viking7 />
<SvelteVictory bind:svelteVictory />
<Memes />
