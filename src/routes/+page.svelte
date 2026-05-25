<script lang="ts">
	import jetaLogo from '$lib/assets/jeta.png';
	import svelteLogo from '$lib/assets/logo.svg';
	// import svelteLogo from '$lib/assets/throne.png';
	import stones1 from '$lib/assets/0_stones_1.png';
	import stones2 from '$lib/assets/0_stones_2.png';
	import cloud from '$lib/assets/cloud.webp';
	import cloudsBlock from '$lib/assets/clouds_block.png';
	import boat from '$lib/assets/boat.png';
	import waterTexture from '$lib/assets/water.png';
	import darkTexture from '$lib/assets/dark-texture.png';
	import conv from '$lib/assets/conv.png';

	import viking0 from '$lib/assets/0.png';
	import viking1 from '$lib/assets/1.png';
	import viking2 from '$lib/assets/2.png';
	import viking3 from '$lib/assets/3.png';
	import viking4 from '$lib/assets/4.png';
	import viking5 from '$lib/assets/5.png';
	import viking6 from '$lib/assets/6.png';
	import viking7 from '$lib/assets/7.png';

	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { SplitText } from 'gsap/SplitText';

	let now = $state(Date.now());
	const startDate = new Date('2016-10-29T00:00:00').getTime();

	$effect(() => {
		let frame: number;

		function update() {
			now = Date.now();
			frame = requestAnimationFrame(update);
		}

		frame = requestAnimationFrame(update);

		return () => cancelAnimationFrame(frame);
	});

	const svelteAge = $derived((now - startDate) / 1000 / 3600 / 24 / 360);

	$effect(() => {
		gsap.registerPlugin(ScrollTrigger);
		gsap.registerPlugin(SplitText);

		function setFixedLayerVisible(selector: string, visible: boolean, display = 'block') {
			gsap.set(selector, {
				autoAlpha: visible ? 1 : 0,
				display: visible ? display : 'none'
			});
		}

		function syncFixedLayer(
			selector: string,
			display = 'block'
		): NonNullable<ScrollTrigger.Vars['onUpdate']> {
			return (self) => {
				setFixedLayerVisible(
					selector,
					self.isActive && self.progress > 0 && self.progress < 1,
					display
				);
			};
		}

		gsap.to('.stones1', {
			xPercent: -100,
			yPercent: 100,
			duration: 5,
			opacity: 0,
			ease: 'expoScale(0.5,7,none)',
			scrollTrigger: {
				trigger: '.bg-viking-1',
				start: 'top bottom',
				end: '+=100%',
				scrub: true
			}
		});

		gsap.to('.stones2', {
			xPercent: 100,
			yPercent: 100,
			opacity: 0,
			duration: 5,
			ease: 'expoScale(0.5,7,none)',
			scrollTrigger: {
				trigger: '.bg-viking-1',
				start: 'top bottom',
				end: '+=200%',
				scrub: true
			}
		});

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.bg-clouds',
				start: 'center bottom',
				end: '+=150%',
				scrub: true,
				onRefresh: syncFixedLayer('.clouds', 'flex'),
				onUpdate: syncFixedLayer('.clouds', 'flex')
			}
		});

		tl.fromTo(
			'.cloud',
			{
				x: -1000,
				opacity: 0
			},
			{
				x: 0,
				opacity: 1,
				duration: 5
			}
		);

		tl.to('.cloud', {
			x: 1000,
			opacity: 0,
			duration: 5
		});

		const boatTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.water',
				start: 'top bottom',
				end: '+=200%',
				scrub: true,
				onRefresh: syncFixedLayer('.boat'),
				onUpdate: syncFixedLayer('.boat')
			}
		});

		boatTl.to('.boat', {
			yPercent: 100,
			duration: 4
		});

		boatTl.to('.boat', {
			yPercent: 200,
			duration: 4
		});

		gsap.to('.dark-texture', {
			'--circle-r': '0px',
			duration: 1,
			ease: 'power4.out',
			scrollTrigger: {
				trigger: '.viking-3-section',
				start: 'top top',
				end: '+=50%',
				scrub: true
			}
		});

		const lightTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.light-screen',
				start: 'top bottom',
				end: '+=100%',
				scrub: true,
				onRefresh: syncFixedLayer('.light-section'),
				onUpdate: syncFixedLayer('.light-section')
			}
		});

		lightTl.to('.light', {
			opacity: 1,
			duration: 0.1
		});

		lightTl.to('.light', {
			scale: 70,
			duration: 2,
			ease: 'power4.out'
		});

		lightTl.to('.light-section', {
			background: 'white',
			duration: 1
		});

		lightTl.to('.light', {
			opacity: 0,
			duration: 1
		});

		lightTl.to('.light-section', {
			background: 'transparent',
			duration: 1,
			ease: 'power4.in'
		});

		lightTl.to(
			'.viking-6-light-mask',
			{
				background: 'white',
				duration: 1
			},
			'<'
		);

		lightTl.to(
			'.light-screen',
			{
				background: 'white',
				duration: 1
			},
			'<'
		);

		lightTl.to(
			'.bg-viking-7',
			{
				opacity: 1,
				duration: 1
			},
			'<'
		);

		gsap.to('.bg-viking-7', {
			scale: 0,
			duration: 2,
			ease: 'none',
			overwrite: 'auto',
			scrollTrigger: {
				trigger: '.sveltevictory',
				start: 'top bottom',
				end: '+=50%',
				scrub: true
			}
		});
	});
</script>

<div class="gallery flex flex-col items-center bg-[#FAE8D5]">
	<div
		class="clouds pointer-events-none fixed top-0 z-20 hidden h-screen w-screen flex-wrap items-center justify-center"
	>
		{#each { length: 8 } as _, i (i)}
			<img src={cloud} alt="Облако" class="cloud z-20 scale-200 opacity-0" />
		{/each}
	</div>
	<div class="stones-layer pointer-events-none fixed top-0 z-20 flex">
		<img src={stones1} alt="" class="stones1 w-1/2" />
		<img src={stones2} alt="" class="stones2 w-1/2" />
	</div>
	<div class="relative flex h-screen w-screen snap-start flex-col items-center">
		<img
			src={jetaLogo}
			alt=""
			class="relative z-10 mt-20 w-40 drop-shadow-2xl drop-shadow-amber-600"
		/>
		<header class="z-10 font-runic text-8xl font-bold drop-shadow-svelte">свелтпобеда.рф</header>
		<img src={viking0} alt="" class="bg-viking-0 image-fade-y absolute top-0 h-full" />
	</div>
	<img src={viking1} alt="" class="bg-viking-1 image-fade-y h-screen snap-start" />
	<img
		src={cloudsBlock}
		alt=""
		class="bg-clouds image-fade-y z-10 -mt-50 -mb-50 w-screen snap-center"
	/>
	<img
		src={boat}
		alt=""
		class="boat pointer-events-none fixed -top-full z-20 hidden h-screen drop-shadow-2xl drop-shadow-black"
	/>
	<img src={viking2} alt="" class="bg-viking-2 image-fade-y h-screen snap-start" />
	<img src={waterTexture} alt="" class="water image-fade-y h-screen snap-start" />
	<div class="viking-3-section relative flex h-screen w-screen snap-start justify-center">
		<img src={viking3} alt="" class="bg-viking-3 h-screen w-auto" />
		<img src={darkTexture} alt="" class="dark-texture absolute inset-0 h-screen w-screen" />
	</div>
</div>
<div class="w-screen bg-[#191511]">
	<img src={darkTexture} alt="" class="image-fade-bottom h-screen w-screen" />
	<img src={viking4} alt="" class="bg-viking-4 image-fade-both h-screen snap-start" />
	<img src={viking5} alt="" class="bg-viking-5 image-fade-top h-screen snap-start" />
	<div class="relative h-screen w-screen snap-start">
		<img src={viking6} alt="" class="bg-viking-6 h-screen" />
		<div
			class="viking-6-light-mask pointer-events-none absolute top-0 h-full w-full bg-transparent"
		></div>
		<div
			class="light pointer-events-none absolute top-[31%] left-[64%] z-20 size-10 rounded-full opacity-0"
		></div>
	</div>
	<div
		class="light-section pointer-events-none fixed top-0 hidden h-screen w-screen bg-transparent"
	></div>
</div>
<div class="light-screen h-screen w-screen snap-start bg-black">
	<img
		src={viking7}
		alt=""
		class="bg-viking-7 image-fade-both pointer-events-none h-screen opacity-0"
	/>
</div>
<div
	class="sveltevictory flex h-screen w-screen snap-start flex-col items-center justify-center gap-8"
>
	<!-- animate svelte logo -->
	<img src={conv} alt="" class="image-fade-x h-1/2" />
	<header class="flex flex-col text-center font-sans text-4xl font-bold uppercase">
		<div class="victory-header flex">
			<img src={svelteLogo} alt="" class="mt-2 h-20" />
			<span class="text-[85px]"><span class="text-svelte">велт</span>победа</span>
		</div>
		<span class="victory-subheader"
			>уже <span class="mx-3 tabular-nums">{svelteAge.toFixed(12)}</span> лет</span
		>
	</header>
</div>
<div class="benefits h-screen w-screen snap-start p-20">
	<div class="flex w-fit flex-col gap-4 rounded-xl bg-muted p-10">
		<header class="text-xl font-medium">
			Почему <i>свелтпобеда</i> в {new Date().getFullYear()} году?
		</header>
		<ol class="ml-8 list-decimal">
			<li>преимущество</li>
			<li>преимущество</li>
			<li>преимущество</li>
			<li>преимущество</li>
			<li>преимущество</li>
		</ol>
	</div>
</div>

<style>
	.image-fade-x {
		mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
	}
	.image-fade-y {
		mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
	}
	.image-fade-top {
		mask-image: linear-gradient(to top, black 0%, black 90%, transparent);
	}
	.image-fade-bottom {
		mask-image: linear-gradient(to bottom, black 0%, black 90%, transparent);
	}
	.image-fade-both {
		mask-image:
			linear-gradient(to right, transparent, black 10%, black 90%, transparent),
			linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
		-webkit-mask-composite: source-in;
		mask-composite: intersect;
	}
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
	.light {
		background: radial-gradient(
			circle,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 0.6) 40%,
			rgba(255, 255, 255, 0.1) 70%,
			transparent 100%
		);
	}

	@media (max-width: 767px) {
		:global(html) {
			scroll-snap-type: y proximity;
		}

		:global(body) {
			width: 100%;
			overflow-x: hidden;
		}

		.gallery,
		.gallery > :global(.w-screen),
		:global(.w-screen),
		:global(.h-screen) {
			width: 100%;
		}

		:global(.h-screen) {
			height: 100svh;
		}

		.clouds,
		.stones-layer,
		.boat,
		.light-section {
			width: 100%;
			height: 100svh;
			overflow: hidden;
		}

		.clouds {
			align-content: center;
			gap: 1rem;
			padding: 10svh 0;
		}

		.cloud {
			width: 48vw;
			max-width: 13rem;
			height: auto;
		}

		.stones1,
		.stones2 {
			width: 55vw;
			height: auto;
		}

		.gallery > div:first-of-type + .stones-layer + div {
			justify-content: flex-start;
			gap: 0.75rem;
			overflow: hidden;
			padding-inline: 1rem;
		}

		.gallery > div:first-of-type + .stones-layer + div > img:first-child {
			width: clamp(5rem, 30vw, 7rem);
			margin-top: 3rem;
		}

		.gallery > div:first-of-type + .stones-layer + div > header {
			max-width: min(100%, 23rem);
			font-size: clamp(2.35rem, 13vw, 4.5rem);
			line-height: 0.95;
			text-align: center;
			overflow-wrap: anywhere;
		}

		.bg-viking-0,
		.bg-viking-1,
		.bg-viking-2,
		.bg-viking-3,
		.bg-viking-4,
		.bg-viking-5,
		.bg-viking-6,
		.bg-viking-7,
		.water,
		.dark-texture,
		.light-screen > img {
			width: 100%;
			height: 100svh;
			max-width: none;
			object-fit: cover;
			object-position: center;
		}

		.bg-viking-0 {
			object-position: center bottom;
		}

		.bg-viking-3,
		.bg-viking-6 {
			object-position: 52% center;
		}

		.bg-clouds {
			width: 160vw;
			max-width: none;
			margin-top: -16svh;
			margin-bottom: -12svh;
			object-fit: cover;
		}

		.boat {
			top: -100svh;
			left: 50%;
			width: min(110vw, 34rem);
			max-width: none;
			height: auto;
			transform: translateX(-50%);
		}

		.viking-3-section {
			width: 100%;
			overflow: hidden;
		}

		.dark-texture {
			--circle-x: 52%;
			--circle-y: 45%;
			--circle-r: 120vw;
		}

		.light {
			top: 31%;
			left: 63%;
			width: 2rem;
			height: 2rem;
		}

		.sveltevictory {
			width: 100%;
			min-height: 100svh;
			gap: 1.25rem;
			overflow: hidden;
			padding: 1rem;
		}

		.sveltevictory > img {
			width: min(88vw, 24rem);
			height: auto;
			max-height: 44svh;
			object-fit: contain;
		}

		.sveltevictory header {
			width: 100%;
			font-size: clamp(1.2rem, 5.4vw, 1.75rem);
			line-height: 1.12;
		}

		.victory-header {
			align-items: center;
			justify-content: center;
			width: 100%;
		}

		.victory-header img {
			width: clamp(2.4rem, 14vw, 4rem);
			height: auto;
			margin-top: 0;
			flex: 0 0 auto;
		}

		.victory-header span {
			font-size: clamp(2.6rem, 13vw, 4.6rem);
			line-height: 0.95;
		}

		.victory-subheader {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 0.2rem 0.45rem;
			margin-top: 0.35rem;
			padding-inline: 0.25rem;
			overflow-wrap: anywhere;
		}

		.victory-subheader :global(.tabular-nums) {
			margin-inline: 0;
			font-size: clamp(1.25rem, 6vw, 2rem);
			line-height: 1.1;
		}

		.benefits {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			min-height: 100svh;
			padding: 1rem;
		}

		.benefits > div {
			width: 100%;
			max-width: 24rem;
			padding: 1.25rem;
			border-radius: 0.5rem;
		}

		.benefits header {
			font-size: clamp(1rem, 5vw, 1.25rem);
			line-height: 1.25;
		}
	}
</style>
