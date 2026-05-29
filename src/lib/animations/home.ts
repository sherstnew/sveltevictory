import { gsap } from 'gsap';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export type HomeAnimationRefs = {
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
	lightScreen: HTMLElement;
	lightSection: HTMLElement;
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

export function setupHomeAnimations(refs: HomeAnimationRefs) {
	gsap.registerPlugin(ScrollTrigger);

	const animations: GsapAnimation[] = [];
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
				end: '+=200%',
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

	lightTl.to(refs.light, {
		opacity: 1,
		duration: 0.1
	});

	lightTl.to(refs.light, {
		scale: 70,
		duration: 2,
		ease: 'power4.out'
	});

	lightTl.to(refs.lightSection, {
		background: 'white',
		duration: 1
	});

	lightTl.to(refs.light, {
		opacity: 0,
		duration: 1
	});

	lightTl.to(refs.lightSection, {
		background: 'transparent',
		duration: 1,
		ease: 'power4.in'
	});

	lightTl.to(
		refs.viking6LightMask,
		{
			background: 'white',
			duration: 1
		},
		'<'
	);

	lightTl.to(
		refs.lightScreen,
		{
			background: 'white',
			duration: 1
		},
		'<'
	);

	lightTl.to(
		refs.viking7,
		{
			opacity: 1,
			duration: 1
		},
		'<'
	);

	animations.push(lightTl);

	animations.push(
		gsap.to(refs.viking7, {
			scale: 0,
			duration: 2,
			ease: 'none',
			overwrite: 'auto',
			scrollTrigger: {
				trigger: refs.svelteVictory,
				start: 'top bottom',
				end: '+=50%',
				scrub: true
			}
		})
	);

	return () => {
		if (lenisFrame) {
			cancelAnimationFrame(lenisFrame);
		}

		lenis?.destroy();
		animations.forEach(killAnimation);
	};
}
