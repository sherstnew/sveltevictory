import { gsap } from 'gsap';
import Lenis from 'lenis';
import { ExpoScaleEase } from 'gsap/EasePack';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export type HomeAnimationRefs = {
	stonesLayer: HTMLElement;
	stones1: HTMLElement;
	stones2: HTMLElement;
	viking1: HTMLElement;
	cloudsLayer: HTMLElement;
	clouds: HTMLElement[];
	cloudsTrigger: HTMLElement;
	boat: HTMLElement;
	water: HTMLElement;
	darkTexture: HTMLElement;
	darkScene: HTMLElement;
	viking4Scene: HTMLElement;
	viking5Scene: HTMLElement;
	viking6Scene: HTMLElement;
	darkPassLayer: HTMLElement;
	darkPassSmoke: HTMLElement;
	torchGlow: HTMLElement;
	runesVeil: HTMLElement;
	lightScreen: HTMLElement;
	lightSection: HTMLElement;
	lightWave: HTMLElement;
	light: HTMLElement;
	viking6LightMask: HTMLElement;
	viking7: HTMLElement;
	svelteVictory: HTMLElement;
};

type GsapAnimation = gsap.core.Animation & {
	scrollTrigger?: ScrollTrigger;
};

function setFixedLayerVisible(element: HTMLElement, visible: boolean, display = 'block') {
	gsap.set(element, {
		autoAlpha: visible ? 1 : 0,
		display: visible ? display : 'none'
	});
}

function syncFixedLayer(
	element: HTMLElement,
	display = 'block'
): NonNullable<ScrollTrigger.Vars['onUpdate']> {
	return (self) => {
		setFixedLayerVisible(element, self.isActive && self.progress > 0 && self.progress < 1, display);
	};
}

function killAnimation(animation: GsapAnimation) {
	animation.scrollTrigger?.kill();
	animation.kill();
}

function isTopScene() {
	return window.scrollY <= window.innerHeight * 0.75;
}

function isHistoryNavigation() {
	const [navigation] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];

	return navigation?.type === 'back_forward';
}

function resetScrollPosition() {
	if (window.location.hash || isHistoryNavigation()) {
		return () => {};
	}

	const previousScrollRestoration =
		'scrollRestoration' in history ? history.scrollRestoration : undefined;

	if (previousScrollRestoration === 'auto') {
		history.scrollRestoration = 'manual';
	}

	const html = document.documentElement;
	const previousScrollBehavior = html.style.scrollBehavior;
	const previousScrollSnapType = html.style.scrollSnapType;
	const timeouts: number[] = [];
	let frame = 0;
	let frameId = 0;

	html.style.scrollBehavior = 'auto';
	html.style.scrollSnapType = 'none';

	function jumpToTop() {
		html.scrollTop = 0;

		if (document.body) {
			document.body.scrollTop = 0;
		}

		window.scrollTo(0, 0);
	}

	function keepTopForBootFrames() {
		jumpToTop();
		frame += 1;

		if (frame < 12) {
			frameId = requestAnimationFrame(keepTopForBootFrames);
			return;
		}

		html.style.scrollBehavior = previousScrollBehavior;
		html.style.scrollSnapType = previousScrollSnapType;
	}

	jumpToTop();
	frameId = requestAnimationFrame(keepTopForBootFrames);
	timeouts.push(window.setTimeout(jumpToTop, 120));
	timeouts.push(window.setTimeout(jumpToTop, 360));

	return () => {
		if (frameId) {
			cancelAnimationFrame(frameId);
		}

		timeouts.forEach((timeout) => clearTimeout(timeout));
		html.style.scrollBehavior = previousScrollBehavior;
		html.style.scrollSnapType = previousScrollSnapType;

		if (previousScrollRestoration) {
			history.scrollRestoration = previousScrollRestoration;
		}
	};
}

function setInitialAnimationState(refs: HomeAnimationRefs) {
	gsap.set([refs.stonesLayer, refs.cloudsLayer, refs.boat, refs.darkPassLayer, refs.lightSection], {
		autoAlpha: 0,
		display: 'none'
	});

	gsap.set(refs.clouds, {
		x: -1000,
		opacity: 0
	});

	gsap.set(refs.boat, {
		yPercent: 0
	});

	gsap.set([refs.stones1, refs.stones2], {
		xPercent: 0,
		yPercent: 0,
		opacity: 1
	});

	gsap.set(refs.lightScreen, {
		clipPath: 'inset(0% 0% 0% 0%)'
	});

	gsap.set([refs.light, refs.lightWave, refs.viking7], {
		opacity: 0
	});
}

export function setupHomeAnimations(refs: HomeAnimationRefs) {
	gsap.registerPlugin(ScrollTrigger, ExpoScaleEase);
	setInitialAnimationState(refs);

	const animations: GsapAnimation[] = [];
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const releaseScrollBootLock = prefersReducedMotion ? () => {} : resetScrollPosition();
	let lenis: Lenis | undefined;
	let lenisFrame = 0;

	if (prefersReducedMotion) {
		return releaseScrollBootLock;
	}

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

	animations.push(
		gsap.to(refs.stones1, {
			xPercent: -100,
			yPercent: 100,
			duration: 5,
			opacity: 0,
			ease: 'expoScale(0.5,7,none)',
			scrollTrigger: {
				trigger: refs.viking1,
				start: 'top bottom',
				end: '+=100%',
				scrub: true
			}
		})
	);

	const stonesVisibility = ScrollTrigger.create({
		trigger: refs.viking1,
		start: 'top bottom',
		end: '+=200%',
		onUpdate: (self) => {
			setFixedLayerVisible(refs.stonesLayer, isTopScene() || self.progress < 1, 'flex');
		},
		onRefresh: (self) => {
			setFixedLayerVisible(refs.stonesLayer, isTopScene() || self.progress < 1, 'flex');
		},
		onLeave: () => setFixedLayerVisible(refs.stonesLayer, false, 'flex'),
		onLeaveBack: () => setFixedLayerVisible(refs.stonesLayer, true, 'flex')
	});

	if (isTopScene()) {
		animations.push(
			gsap.fromTo(
				refs.stonesLayer,
				{
					autoAlpha: 0,
					display: 'flex'
				},
				{
					autoAlpha: 1,
					duration: 1.15,
					delay: 0.22,
					ease: 'power2.out'
				}
			)
		);
	}

	animations.push(
		gsap.to(refs.stones2, {
			xPercent: 100,
			yPercent: 100,
			opacity: 0,
			duration: 5,
			ease: 'expoScale(0.5,7,none)',
			scrollTrigger: {
				trigger: refs.viking1,
				start: 'top bottom',
				end: '+=100%',
				scrub: true
			}
		})
	);

	const cloudsTl = gsap.timeline({
		scrollTrigger: {
			trigger: refs.cloudsTrigger,
			start: 'center bottom',
			end: '+=150%',
			scrub: true,
			onRefresh: syncFixedLayer(refs.cloudsLayer, 'flex'),
			onUpdate: syncFixedLayer(refs.cloudsLayer, 'flex')
		}
	});

	cloudsTl.fromTo(
		refs.clouds,
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

	cloudsTl.to(refs.clouds, {
		x: 1000,
		opacity: 0,
		duration: 5
	});

	animations.push(cloudsTl);

	const boatTl = gsap.timeline({
		scrollTrigger: {
			trigger: refs.water,
			start: 'top bottom',
			end: '+=200%',
			scrub: true,
			onRefresh: syncFixedLayer(refs.boat),
			onUpdate: syncFixedLayer(refs.boat)
		}
	});

	boatTl.to(refs.boat, {
		yPercent: 100,
		duration: 4
	});

	boatTl.to(refs.boat, {
		yPercent: 200,
		duration: 4
	});

	animations.push(boatTl);

	animations.push(
		gsap.to(refs.darkTexture, {
			'--circle-r': '0px',
			duration: 1,
			ease: 'power4.out',
			scrollTrigger: {
				trigger: refs.darkScene,
				start: 'top top',
				end: '+=50%',
				scrub: true
			}
		})
	);

	const darkPassTl = gsap.timeline({
		scrollTrigger: {
			trigger: refs.viking4Scene,
			start: 'top center',
			endTrigger: refs.viking6Scene,
			end: 'center center',
			scrub: true,
			onRefresh: syncFixedLayer(refs.darkPassLayer),
			onUpdate: syncFixedLayer(refs.darkPassLayer)
		}
	});

	darkPassTl.set([refs.viking4Scene, refs.viking5Scene, refs.viking6Scene], {
		transformOrigin: '50% 50%',
		filter: 'brightness(1) contrast(1)'
	});

	darkPassTl.fromTo(
		refs.darkPassSmoke,
		{
			opacity: 0,
			yPercent: 8,
			scale: 1.08
		},
		{
			opacity: 0.34,
			yPercent: -8,
			scale: 1.16,
			duration: 2.4,
			ease: 'none'
		}
	);

	darkPassTl.to(
		refs.viking4Scene,
		{
			scale: 1.05,
			filter: 'brightness(0.74) contrast(1.12)',
			duration: 1.2,
			ease: 'none'
		},
		'<'
	);

	darkPassTl.fromTo(
		refs.runesVeil,
		{
			opacity: 0,
			yPercent: 6,
			scale: 0.96
		},
		{
			opacity: 0.62,
			yPercent: -5,
			scale: 1.02,
			duration: 1.4,
			ease: 'power1.inOut'
		},
		'<35%'
	);

	darkPassTl.to(refs.runesVeil, {
		opacity: 0,
		yPercent: -16,
		scale: 1.08,
		duration: 1.2,
		ease: 'power1.in'
	});

	darkPassTl.fromTo(
		refs.torchGlow,
		{
			opacity: 0,
			xPercent: -42,
			yPercent: 14,
			scale: 0.82
		},
		{
			opacity: 0.8,
			xPercent: 74,
			yPercent: -18,
			scale: 1.2,
			duration: 1.9,
			ease: 'power1.inOut'
		},
		'<20%'
	);

	darkPassTl.to(refs.viking5Scene, {
		scale: 1.04,
		filter: 'brightness(0.78) contrast(1.12)',
		duration: 1.3,
		ease: 'none'
	});

	darkPassTl.to(
		refs.torchGlow,
		{
			opacity: 0,
			xPercent: 118,
			yPercent: -36,
			scale: 0.72,
			duration: 1.1,
			ease: 'power2.in'
		},
		'<45%'
	);

	darkPassTl.to(
		refs.darkPassSmoke,
		{
			opacity: 0,
			yPercent: -18,
			duration: 1.2,
			ease: 'power2.in'
		},
		'<35%'
	);

	darkPassTl.to(
		refs.viking6Scene,
		{
			filter: 'brightness(1.08) contrast(1.05)',
			duration: 1,
			ease: 'power1.out'
		},
		'<'
	);

	animations.push(darkPassTl);

	const lightTl = gsap.timeline({
		scrollTrigger: {
			trigger: refs.lightScreen,
			start: 'top bottom',
			end: '+=100%',
			scrub: true,
			onRefresh: syncFixedLayer(refs.lightSection),
			onUpdate: syncFixedLayer(refs.lightSection)
		}
	});

	lightTl.set(refs.lightSection, {
		background: 'transparent'
	});

	lightTl.fromTo(
		refs.lightWave,
		{
			opacity: 0,
			scale: 0.4
		},
		{
			opacity: 1,
			scale: 70,
			duration: 2.2,
			ease: 'power4.out'
		}
	);

	lightTl.to(
		refs.light,
		{
			opacity: 1,
			duration: 0.1
		},
		'<'
	);

	lightTl.to(refs.lightSection, {
		background: 'white',
		duration: 1.2
	});

	lightTl.to(refs.lightWave, {
		opacity: 1,
		duration: 0.45
	});

	lightTl.to(refs.light, {
		opacity: 0,
		duration: 0.8
	});

	lightTl.to(
		refs.viking6LightMask,
		{
			background: 'white',
			duration: 1
		},
		'<'
	);

	lightTl.set(refs.viking7, {
		opacity: 0,
		scale: 1.04,
		filter: 'blur(12px)',
		transformOrigin: '50% 45%'
	});

	lightTl.set(refs.lightScreen, {
		background: 'white'
	});

	lightTl.to(refs.lightWave, {
		opacity: 0,
		duration: 1.1,
		ease: 'power2.in'
	});

	lightTl.to(
		refs.viking7,
		{
			opacity: 1,
			scale: 1,
			filter: 'blur(0px)',
			duration: 2.2,
			ease: 'power2.out'
		},
		'<'
	);

	lightTl.to(
		refs.lightSection,
		{
			background: 'transparent',
			duration: 1.1,
			ease: 'power2.in'
		},
		'<65%'
	);

	animations.push(lightTl);

	const finalSceneTl = gsap.timeline({
		scrollTrigger: {
			trigger: refs.svelteVictory,
			start: 'top bottom',
			end: '+=120%',
			scrub: true
		}
	});

	finalSceneTl.set(refs.viking7, {
		transformOrigin: '50% 45%',
		filter: 'blur(0px)'
	});

	finalSceneTl.to(refs.viking7, {
		scale: 1.025,
		yPercent: -1,
		duration: 0.85,
		ease: 'none'
	});

	finalSceneTl.to(refs.viking7, {
		scale: 1.12,
		yPercent: -8,
		opacity: 0,
		filter: 'blur(18px)',
		duration: 1.15,
		ease: 'power2.out'
	});

	finalSceneTl.to(
		refs.lightScreen,
		{
			clipPath: 'inset(0% 0% 100% 0%)',
			duration: 1.05,
			ease: 'power2.inOut'
		},
		'<35%'
	);

	animations.push(finalSceneTl);

	return () => {
		if (lenisFrame) {
			cancelAnimationFrame(lenisFrame);
		}

		lenis?.destroy();
		releaseScrollBootLock();
		stonesVisibility.kill();
		animations.forEach(killAnimation);
	};
}
