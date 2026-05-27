<script lang="ts">
	import { gsap } from 'gsap';
	import Lenis from 'lenis';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { SplitText } from 'gsap/SplitText';

	import jetaLogo from '$lib/assets/jeta.png';
	import stones1 from '$lib/assets/objects/0-stones-1.png';
	import stones2 from '$lib/assets/objects/0-stones-2.png';
	import cloud from '$lib/assets/objects/cloud.webp';
	import cloudsBlock from '$lib/assets/objects/clouds.png';
	import boat from '$lib/assets/objects/boat.png';
	import waterTexture from '$lib/assets/textures/water.png';
	import darkTexture from '$lib/assets/textures/dark-texture.png';

	import viking0 from '$lib/assets/story/0.png';
	import viking1 from '$lib/assets/story/1.png';
	import viking2 from '$lib/assets/story/2.png';
	import viking3 from '$lib/assets/story/3.png';
	import viking4 from '$lib/assets/story/4.png';
	import viking5 from '$lib/assets/story/5.png';
	import viking6 from '$lib/assets/story/6.png';
	import viking7 from '$lib/assets/story/7.png';

	import SvelteVictory from '$lib/components/svelte-victory.svelte';
	import Memes from '$lib/components/memes.svelte';

	$effect(() => {
		gsap.registerPlugin(ScrollTrigger);
		gsap.registerPlugin(SplitText);

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let lenis: Lenis | undefined;
		let lenisFrame = 0;

		if (!prefersReducedMotion) {
			lenis = new Lenis({
				duration: 1.15,
				easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				smoothWheel: true,
				wheelMultiplier: 0.85,
				touchMultiplier: 1.25
			});

			lenis.on('scroll', ScrollTrigger.update);

			function updateSmoothScroll(time: number) {
				lenis?.raf(time);
				lenisFrame = requestAnimationFrame(updateSmoothScroll);
			}

			lenisFrame = requestAnimationFrame(updateSmoothScroll);
		}

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

		return () => {
			if (lenisFrame) {
				cancelAnimationFrame(lenisFrame);
			}

			lenis?.destroy();
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<div class="gallery flex flex-col items-center bg-[#FAE8D5]">
	<div
		class="clouds pointer-events-none fixed top-0 z-20 hidden h-screen w-screen flex-wrap items-center justify-center"
	>
		{#each { length: 8 } as _, i (i)}
			<img src={cloud} alt="Облако" class="cloud pointer-events-none z-20 scale-200 opacity-0" />
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
		<img
			src={viking0}
			alt=""
			class="bg-viking-0 image-fade-y pointer-events-none absolute top-0 h-full"
		/>
	</div>
	<img src={viking1} alt="" class="bg-viking-1 image-fade-y h-screen snap-start" />
	<img
		src={cloudsBlock}
		alt=""
		class="bg-clouds image-fade-y pointer-events-none z-10 -mt-50 -mb-50 w-screen snap-center"
	/>
	<img
		src={boat}
		alt=""
		class="boat pointer-events-none fixed -top-full z-20 hidden h-screen drop-shadow-2xl drop-shadow-black"
	/>
	<img
		src={viking2}
		alt=""
		class="bg-viking-2 image-fade-y pointer-events-none h-screen snap-start"
	/>
	<img
		src={waterTexture}
		alt=""
		class="water image-fade-y pointer-events-none h-screen snap-start"
	/>
	<div class="viking-3-section relative flex h-screen w-screen snap-start justify-center">
		<img src={viking3} alt="" class="bg-viking-3 pointer-events-none h-screen w-auto" />
		<img
			src={darkTexture}
			alt=""
			class="dark-texture pointer-events-none absolute inset-0 h-screen w-screen"
		/>
	</div>
</div>
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
<SvelteVictory />
<Memes />

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
