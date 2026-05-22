<script lang="ts">
	import jetaLogo from '$lib/assets/jeta.png';
	import stones1 from '$lib/assets/0_stones_1.png';
	import stones2 from '$lib/assets/0_stones_2.png';
	import cloud from '$lib/assets/cloud.webp';
	import cloudsBlock from '$lib/assets/clouds_block.png';
	import boat from '$lib/assets/boat.png';
	import waterTexture from '$lib/assets/water.png';
	import darkTexture from '$lib/assets/dark-texture.png';

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

	import SvelteLogo from '$lib/components/svelte-logo.svelte';

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

		gsap.to('.stones1', {
			xPercent: -100,
			yPercent: 100,
			duration: 5,
			opacity: 0,
			ease: 'expoScale(0.5,7,none)',
			scrollTrigger: {
				trigger: '.bg-viking-1',
				start: 'top bottom',
				end: '+=200%',
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
				scrub: true
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
				scrub: true
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
				scrub: true
			}
		});

		lightTl.to('.light', {
			opacity: 1,
			duration: 0.1
		});

		lightTl.to('.light', {
			scale: 200,
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
	<div class="clouds fixed top-0 z-20 flex h-screen w-screen flex-wrap items-center justify-center">
		{#each { length: 8 } as _, i (i)}
			<img src={cloud} alt="Облако" class="cloud z-20 scale-200 opacity-0" />
		{/each}
	</div>
	<div class="fixed top-0 z-20 flex">
		<img src={stones1} alt="" class="stones1 w-1/2" />
		<img src={stones2} alt="" class="stones2 w-1/2" />
	</div>
	<img src={viking0} alt="" class="bg-viking-0 image-fade-y h-screen snap-start" />
	<img src={viking1} alt="" class="bg-viking-1 image-fade-y h-screen snap-start" />
	<img
		src={cloudsBlock}
		alt=""
		class="bg-clouds image-fade-y z-10 -mt-50 -mb-50 w-screen snap-center"
	/>
	<img
		src={boat}
		alt=""
		class="boat fixed -top-full z-20 h-screen drop-shadow-2xl drop-shadow-black"
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
		<div class="viking-6-light-mask absolute top-0 h-full w-full bg-transparent"></div>
		<div class="light absolute top-[31%] left-[64%] z-20 size-10 rounded-full opacity-0"></div>
	</div>
	<div class="light-section fixed top-0 h-screen w-screen bg-transparent"></div>
</div>
<div class="light-screen h-screen w-screen snap-start bg-black">
	<img src={viking7} alt="" class="bg-viking-7 image-fade-both h-screen opacity-0" />
</div>
<div class="sveltevictory flex h-screen w-screen snap-start items-center p-20 flex-col gap-8">
<!-- animate svelte logo -->
	<SvelteLogo className="w-50" />
	<header class="font-georgia text-5xl font-bold uppercase text-center">
		свелтпобеда уже <br> <span class="tabular-nums block my-5">{svelteAge.toFixed(12)}</span> лет
	</header>
</div>




<style>
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
	.font-georgia {
		font-family: Georgia, serif;
	}
</style>
