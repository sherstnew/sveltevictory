<script lang="ts">
	import { flip } from 'svelte/animate';
	import { gsap } from 'gsap';
	import svelteLogo from '$lib/assets/logo.svg';
	import conv from '$lib/assets/conv.avif';
	import richHarrisPhoto from '$lib/assets/rich-harris.png';
	import richHarrisPhotoSmile from '$lib/assets/rich-harris-smile.png';

	type Particle = {
		id: number;
		type: 'logo' | 'text';
		label: string;
		angle: number;
		distance: number;
		rotation: number;
		rotationDelta: number;
		scale: number;
	};

	let { svelteVictory = $bindable<HTMLElement>() } = $props();

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
	const currentYear = new Date().getFullYear();

	const defaultBenefits = [
		'Компилятор всё понял, а ты потом.',
		'Virtual DOM не умер, он просто не прошёл tree-shaking.',
		'Нет useEffect, нет страданий, нет лишних созвонов.',
		'$state выглядит как заговор, но работает как отпуск.',
		'HTML, CSS и JS наконец-то сидят в одном файле и не дерутся.'
	];
	const victoryBenefits = Array.from({ length: 5 }, (_, index) => `победа ${index + 1}`);
	const particleLabels = ['$', 'state', 'derived', 'effect', 'Virtual DOM -1', 'победа'];

	let countersCard: HTMLDivElement;
	let benefitsList: HTMLOListElement;
	let richClicks = $state(0);
	let particles = $state<Particle[]>([]);

	const isVictoryMode = $derived(richClicks >= 7);
	const visibleBenefits = $derived(isVictoryMode ? victoryBenefits : defaultBenefits);
	const secondsSinceStart = $derived((now - startDate) / 1000);
	const compiledReactivities = $derived(Math.floor(secondsSinceStart * 13 + richClicks * 777));
	const destroyedVirtualDom = $derived(Math.floor(secondsSinceStart * 0.9 + richClicks * 404));
	const undeliveredRuntimeBytes = $derived(Math.floor(secondsSinceStart * 42 + richClicks * 8192));

	function removeParticle(id: number) {
		particles = particles.filter((particle) => particle.id !== id);
	}

	function animateParticle(node: HTMLElement, particle: Particle) {
		const x = Math.cos(particle.angle) * particle.distance;
		const y = Math.sin(particle.angle) * particle.distance;

		const tl = gsap.timeline({
			onComplete: () => removeParticle(particle.id)
		});

		tl.fromTo(
			node,
			{
				left: '50%',
				top: '50%',
				xPercent: -50,
				yPercent: -50,
				x: 0,
				y: 0,
				opacity: 0,
				scale: 0.2,
				rotation: particle.rotation
			},
			{
				x,
				y,
				opacity: 1,
				rotation: `+=${particle.rotationDelta}`,
				scale: particle.scale,
				duration: 0.72,
				ease: 'back.out(2.4)'
			}
		);

		tl.to(node, {
			y: '-=48',
			opacity: 0,
			scale: 0,
			filter: 'blur(6px)',
			duration: 0.55,
			ease: 'power2.in'
		});

		return {
			destroy() {
				tl.kill();
			}
		};
	}

	function animateRichHarris() {
		richClicks += 1;

		if (countersCard) {
			gsap.fromTo(
				countersCard,
				{ scale: 1, boxShadow: '0 0 0 rgba(255, 62, 0, 0)' },
				{
					scale: 1.04,
					boxShadow: '0 0 36px rgba(255, 62, 0, 0.35)',
					duration: 0.16,
					yoyo: true,
					repeat: 1,
					ease: 'power2.out'
				}
			);
		}

		if (richClicks === 7 && benefitsList) {
			gsap.fromTo(
				benefitsList,
				{ x: 0, filter: 'drop-shadow(0 0 0 rgba(255, 62, 0, 0))' },
				{
					x: 12,
					filter: 'drop-shadow(0 0 22px rgba(255, 62, 0, 0.85))',
					duration: 0.08,
					repeat: 7,
					yoyo: true,
					ease: 'power1.inOut'
				}
			);
		}

		const currentParticles: Particle[] = Array.from({ length: 8 }, (_, index) => ({
			id: Date.now() + Math.round(Math.random() * 100000) + index,
			type: index % 3 === 0 ? 'logo' : 'text',
			label: particleLabels[index % particleLabels.length],
			angle: (Math.PI * 2 * index) / 8 + Math.random() * 0.8,
			distance: Math.random() * 180 + 130,
			rotation: Math.random() * 120 - 60,
			rotationDelta: Math.random() * 520 - 260,
			scale: Math.random() * 0.7 + 0.85
		}));

		particles = [...particles, ...currentParticles];
	}

	let richHarrisUrl: string = $state(richHarrisPhoto);

	function toggleRichHarris(mode: 'out' | 'in') {
		if (mode == 'out') {
			richHarrisUrl = richHarrisPhoto;
		} else {
			richHarrisUrl = richHarrisPhotoSmile;
		}
	}
</script>

<div
	class="sveltevictory flex h-screen w-screen snap-start flex-col items-center justify-center gap-8"
	bind:this={svelteVictory}
>
	<img src={conv} alt="" class="image-fade-x xl:h-1/2" />
	<header
		class="flex flex-col gap-2 text-center font-sans text-2xl font-bold uppercase lg:text-4xl"
	>
		<div class="victory-header flex justify-center gap-1 lg:gap-2">
			<img src={svelteLogo} alt="" class="mt-1.5 h-8 lg:mt-2 lg:h-20" />
			<span class="text-4xl lg:text-8xl"><span class="text-svelte">велт</span>победа</span>
		</div>
		<span class="victory-subheader"
			>уже <span class="mx-3 tabular-nums">{svelteAge.toFixed(12)}</span> лет</span
		>
	</header>
</div>
<div
	class="benefits relative flex min-h-screen w-screen snap-start items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:h-screen lg:px-10 lg:py-10 xl:px-16"
>
	<div
		class="benefits-shell relative z-10 flex w-full max-w-7xl items-stretch gap-3 lg:max-h-[85vh] lg:gap-6 xl:gap-4"
	>
		<section
			class="benefits-copy flex min-w-0 flex-col justify-start gap-5 rounded-2xl p-4 sm:p-6 lg:p-7"
		>
			<header class="flex flex-col gap-2 leading-tight">
				<h2 class="text-xl font-black text-balance uppercase sm:text-2xl lg:text-3xl">
					Почему {currentYear} это год очередной <i class="text-svelte">свелтпобеды?</i>
				</h2>
			</header>

			<ol
				class="grid gap-2 text-sm font-semibold sm:text-base lg:text-[1.05rem]"
				bind:this={benefitsList}
			>
				{#each visibleBenefits as benefit, index (benefit)}
					<li
						animate:flip={{ duration: 280 }}
						class="benefit-row grid grid-cols-[auto_1fr] gap-2.5"
					>
						<span class="benefit-index">{index + 1}</span>
						<span>{benefit}</span>
					</li>
				{/each}
			</ol>

			<div class="grid gap-3 rounded-2xl sm:grid-cols-3" bind:this={countersCard}>
				<div class="metric-card">
					<div class="font-mono text-xl font-black text-svelte tabular-nums sm:text-2xl">
						{compiledReactivities.toLocaleString('ru-RU')}
					</div>
					<div class="text-xs font-black tracking-wide uppercase">скомпилировано реактивностей</div>
				</div>
				<div class="metric-card virtual-dom-counter">
					<div class="font-mono text-xl font-black text-svelte tabular-nums sm:text-2xl">
						{destroyedVirtualDom.toLocaleString('ru-RU')}
					</div>
					<div class="text-xs font-black tracking-wide uppercase">уничтожено Virtual DOM</div>
				</div>
				<div class="metric-card">
					<div class="font-mono text-xl font-black text-svelte tabular-nums sm:text-2xl">
						{undeliveredRuntimeBytes.toLocaleString('ru-RU')}
					</div>
					<div class="text-xs font-black tracking-wide uppercase">
						байт рантайма не доставлено пользователю
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-2 sm:flex-row sm:items-center">
				<a
					href="https://svelte.dev/playground"
					target="_blank"
					rel="noreferrer"
					class="victory-cta"
				>
					потрогать свелтпобеду руками
				</a>
			</div>
		</section>

		<section
			class="rich-stage relative flex max-h-5/6 min-h-[340px] items-center justify-center overflow-hidden rounded-2xl p-5 sm:min-h-[390px] lg:min-h-0 lg:p-7"
		>
			<div class="rich-orbit rich-orbit-one"></div>
			<div class="rich-orbit rich-orbit-two"></div>
			<div class="rich-orbit rich-orbit-three"></div>
			<div class="rich-code-rain" aria-hidden="true">
				<span>$state</span>
				<span>DOM--</span>
				<span>{'{#if}'}</span>
				<span>compile()</span>
			</div>
			{#each particles as particle (particle.id)}
				{#if particle.type === 'logo'}
					<img
						src={svelteLogo}
						alt="Svelte Logo"
						class="absolute w-14 opacity-0 drop-shadow-2xl lg:w-20"
						use:animateParticle={particle}
					/>
				{:else}
					<span
						class="absolute rounded-full bg-svelte px-3 py-1 font-mono text-sm font-black text-white opacity-0 drop-shadow-2xl lg:text-base"
						use:animateParticle={particle}
					>
						{particle.label}
					</span>
				{/if}
			{/each}
			<button
				onclick={animateRichHarris}
				class="rich-button relative z-10 flex h-[300px] w-full items-center justify-center sm:h-[360px] lg:h-full"
				onmouseenter={() => toggleRichHarris('in')}
				onmouseleave={() => toggleRichHarris('out')}
			>
				<img src={richHarrisUrl} alt="Rich Harris" class="rich-photo max-h-full object-contain" />
			</button>
		</section>
	</div>
</div>

<style>
	.benefits-copy,
	.rich-stage {
		border: 1px solid rgba(255, 62, 0, 0.16);
		background: rgba(255, 255, 255, 0.78);
		backdrop-filter: blur(18px);
	}

	.benefit-row {
		align-items: start;
		border: 1px solid rgba(255, 62, 0, 0.12);
		border-radius: 1rem;
		background:
			linear-gradient(90deg, rgba(255, 62, 0, 0.11), transparent), rgba(255, 255, 255, 0.58);
		padding: 0.62rem 0.8rem;
	}

	.benefit-index {
		display: grid;
		width: 1.55rem;
		height: 1.55rem;
		place-items: center;
		border-radius: 9999px;
		background: var(--color-svelte);
		color: white;
		font-size: 0.74rem;
		font-weight: 900;
		line-height: 1;
	}

	.metric-card {
		min-width: 0;
		border: 1px solid rgba(255, 62, 0, 0.2);
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.72);
		padding: 0.82rem;
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85);
	}

	.virtual-dom-counter {
		background:
			linear-gradient(135deg, rgba(255, 62, 0, 0.1), rgba(255, 255, 255, 0.72)),
			rgba(255, 255, 255, 0.72);
	}

	.victory-cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: fit-content;
		border-radius: 9999px;
		background: #ff3e00;
		padding: 0.72rem 1.05rem;
		color: white;
		font-size: 0.88rem;
		font-weight: 900;
		text-transform: uppercase;
		box-shadow: 0 16px 38px rgba(255, 62, 0, 0.32);
		transition:
			transform 0.18s ease,
			box-shadow 0.18s ease;
	}

	.victory-cta:hover {
		transform: translateY(-2px) scale(1.03);
		box-shadow: 0 20px 48px rgba(255, 62, 0, 0.42);
	}

	.rich-stage {
		background:
			radial-gradient(circle at 50% 46%, rgba(255, 62, 0, 0.22), transparent 19rem),
			linear-gradient(160deg, rgba(255, 255, 255, 0.86), rgba(255, 240, 232, 0.76));
	}

	.rich-button {
		border: 0;
		background: transparent;
		cursor: pointer;
	}

	.rich-photo {
		margin-inline: auto;
		max-width: min(100%, 24rem);
		filter: drop-shadow(0 32px 38px rgba(40, 18, 10, 0.34));
		transform-origin: 50% 88%;
		animation: rich-idle 3.2s ease-in-out infinite;
	}

	.rich-orbit {
		position: absolute;
		left: 50%;
		top: 50%;
		border: 1px dashed rgba(255, 62, 0, 0.34);
		border-radius: 9999px;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}

	.rich-orbit-one {
		width: min(86%, 31rem);
		aspect-ratio: 1;
		animation: orbit-spin 11s linear infinite;
	}

	.rich-orbit-two {
		width: min(68%, 24rem);
		aspect-ratio: 1;
		animation: orbit-spin 7s linear infinite reverse;
	}

	.rich-orbit-three {
		width: min(48%, 17rem);
		aspect-ratio: 1;
		border-style: solid;
		animation: orbit-wobble 3.4s ease-in-out infinite;
	}

	.rich-code-rain {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.rich-code-rain span {
		position: absolute;
		left: var(--x, 50%);
		top: -2rem;
		color: rgba(255, 62, 0, 0.35);
		font-family: monospace;
		font-weight: 900;
		animation: code-rain 4.5s linear infinite;
	}

	.rich-code-rain span:nth-child(1) {
		--x: 12%;
		animation-delay: 0s;
	}

	.rich-code-rain span:nth-child(2) {
		--x: 72%;
		animation-delay: 0.9s;
	}

	.rich-code-rain span:nth-child(3) {
		--x: 28%;
		animation-delay: 1.7s;
	}

	.rich-code-rain span:nth-child(4) {
		--x: 84%;
		animation-delay: 2.4s;
	}

	@keyframes rich-idle {
		0%,
		100% {
			transform: translateY(0) rotate(-0.35deg);
		}
		50% {
			transform: translateY(-0.65rem) rotate(0.35deg);
		}
	}

	@keyframes orbit-spin {
		to {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}

	@keyframes orbit-wobble {
		0%,
		100% {
			transform: translate(-50%, -50%) rotate(-6deg) scaleX(1.08);
		}
		50% {
			transform: translate(-50%, -50%) rotate(6deg) scaleY(1.1);
		}
	}

	@keyframes code-rain {
		from {
			transform: translateY(-2rem) rotate(-8deg);
			opacity: 0;
		}
		15%,
		72% {
			opacity: 1;
		}
		to {
			transform: translateY(44rem) rotate(10deg);
			opacity: 0;
		}
	}

	@media (max-width: 1023px) {
		.benefits {
			align-items: start;
			background:
				radial-gradient(circle at 50% 3rem, rgba(255, 62, 0, 0.16), transparent 18rem),
				linear-gradient(180deg, #fff8f3 0%, #fff 52%, #fff1ea 100%);
		}

		.benefits-shell {
			max-width: 42rem;
			margin-inline: auto;
		}

		.rich-stage {
			min-height: clamp(22rem, 52vh, 31rem);
		}
	}

	@media (max-width: 640px) {
		.benefit-row {
			padding: 0.72rem 0.8rem;
		}

		.metric-card {
			padding: 0.85rem;
		}
	}
</style>
