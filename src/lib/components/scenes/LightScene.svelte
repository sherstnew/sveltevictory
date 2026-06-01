<script lang="ts">
	import darkTexture from '$lib/assets/textures/dark-texture.avif';
	import viking4 from '$lib/assets/story/4.avif';
	import viking5 from '$lib/assets/story/5.avif';
	import viking6 from '$lib/assets/story/6.avif';
	import viking7Image from '$lib/assets/story/7.avif';

	let {
		viking4Scene = $bindable<HTMLElement>(),
		viking5Scene = $bindable<HTMLElement>(),
		viking6Scene = $bindable<HTMLElement>(),
		darkPassLayer = $bindable<HTMLElement>(),
		darkPassSmoke = $bindable<HTMLElement>(),
		torchGlow = $bindable<HTMLElement>(),
		runesVeil = $bindable<HTMLElement>(),
		lightScreen = $bindable<HTMLElement>(),
		lightSection = $bindable<HTMLElement>(),
		lightWave = $bindable<HTMLElement>(),
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
		bind:this={viking4Scene}
	/>
	<img
		src={viking5}
		alt=""
		class="bg-viking-5 image-fade-top pointer-events-none h-screen snap-start"
		bind:this={viking5Scene}
	/>
	<div
		class="viking-6-scene pointer-events-none relative h-screen w-screen snap-start bg-white"
		bind:this={viking6Scene}
	>
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
		class="light-section pointer-events-none fixed top-0 z-30 hidden h-screen w-screen overflow-hidden bg-transparent"
		bind:this={lightSection}
	>
		<div class="light-wave" bind:this={lightWave}></div>
	</div>
	<div
		class="dark-pass-layer pointer-events-none fixed top-0 z-10 hidden h-screen w-screen overflow-hidden"
		bind:this={darkPassLayer}
	>
		<img src={darkTexture} alt="" class="dark-pass-smoke h-full w-full" bind:this={darkPassSmoke} />
		<div class="torch-glow" bind:this={torchGlow}></div>
		<div class="runes-veil font-runic" bind:this={runesVeil} aria-hidden="true">
			<span>свелтпобеда.рф</span>
			<span>свелтпобеда.рф</span>
		</div>
	</div>
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

	.light-wave {
		position: absolute;
		top: 31%;
		left: 64%;
		width: 2.5rem;
		aspect-ratio: 1;
		border-radius: 9999px;
		background: radial-gradient(
			circle,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 0.82) 38%,
			rgba(255, 255, 255, 0.28) 68%,
			transparent 100%
		);
		opacity: 0;
		transform: translate(-50%, -50%);
		transform-origin: 50% 50%;
	}

	.dark-pass-smoke {
		opacity: 0;
		object-fit: cover;
		filter: contrast(1.18) brightness(0.64);
		mix-blend-mode: screen;
	}

	.torch-glow {
		position: absolute;
		left: 18%;
		top: 58%;
		width: min(42vw, 34rem);
		aspect-ratio: 1;
		border-radius: 9999px;
		background: radial-gradient(
			circle,
			rgba(255, 154, 64, 0.32) 0%,
			rgba(255, 95, 18, 0.14) 32%,
			rgba(255, 255, 255, 0.03) 58%,
			transparent 72%
		);
		filter: blur(22px);
		mix-blend-mode: screen;
		opacity: 0;
		transform: translate(-50%, -50%);
	}

	.runes-veil {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		gap: clamp(1.8rem, 6vh, 4.5rem);
		contain: paint;
		color: rgba(255, 216, 176, 0.18);
		font-size: clamp(1.6rem, 5vw, 5.6rem);
		letter-spacing: 0;
		line-height: 0.9;
		opacity: 0;
		text-align: center;
		will-change: opacity, transform;
	}

	.runes-veil span {
		display: block;
		white-space: nowrap;
	}

	.runes-veil span:nth-child(1) {
		transform: translateX(-12vw) rotate(-2deg);
	}

	.runes-veil span:nth-child(2) {
		transform: translateX(10vw) rotate(1.8deg);
		color: rgba(255, 154, 90, 0.18);
	}
</style>
