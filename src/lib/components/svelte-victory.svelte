<script lang="ts">
	import { gsap } from 'gsap';
	import svelteLogo from '$lib/assets/logo.svg';
	import conv from '$lib/assets/conv.png';
	import richHarrisPhoto from '$lib/assets/rich-harris.png';
	import richHarrisPhotoSmile from '$lib/assets/rich-harris-smile.png';

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

	let logosContainer: HTMLDivElement;

	function animateRichHarris() {
		if (logosContainer) {
			const id = Math.round(Math.random() * 100000);
			const currentElements: HTMLImageElement[] = [];
			for (let i = 0; i < 3; i++) {
				const element = document.createElement('img');
				element.src = svelteLogo;
				element.classList.add(
					`svelte-logo-${id}`,
					'w-20',
					'absolute',
					'opacity-0',
					'top-1/3',
					'left-1/3',
					'drop-shadow-2xl'
				);
				element.alt = 'Svelte Logo';

				logosContainer.append(element);
				currentElements.push(element);
			}

			const tl = gsap.timeline({
				onComplete: () => {
					currentElements.forEach((el) => {
						logosContainer.removeChild(el);
					});
				}
			});

			tl.to(
				currentElements[0],
				{
					x: `-=${Math.random() * 100 + 100}`,
					y: `-=${Math.random() * 100 + 100}`,
					opacity: 1,
					duration: 1
				},
				'<'
			);
			tl.to(
				currentElements[1],
				{
					x: `+=${Math.random() * 200 - 100}`,
					y: '-=300',
					opacity: 1,
					duration: 1
				},
				'<'
			);
			tl.to(
				currentElements[2],
				{
					x: `+=${Math.random() * 100 + 100}`,
					y: `-=${Math.random() * 100 + 100}`,
					opacity: 1,
					duration: 1
				},
				'<'
			);

			tl.to(`.svelte-logo-${id}`, {
				opacity: 0,
				duration: 1
			});
		}
	}

    let RichHarrisUrl: string = $state(richHarrisPhoto);

    function toggleRichHarris(mode: "out" | "in") {
        if (mode == "out") {
            RichHarrisUrl = richHarrisPhoto;
        } else {
            RichHarrisUrl = richHarrisPhotoSmile;
        }
    }
</script>

<div
	class="sveltevictory flex h-screen w-screen snap-start flex-col items-center justify-center gap-8"
>
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
<div class="benefits flex h-screen w-screen snap-start justify-between p-20">
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
	<div class="relative flex h-full items-center" bind:this={logosContainer}>
		<button
			onclick={animateRichHarris}
			class="relative z-10 h-3/4 transition-transform duration-75 active:scale-80"
            onmouseenter={() => toggleRichHarris("in")}
            onmouseleave={() => toggleRichHarris("out")}
		>
			<img src={RichHarrisUrl} alt="Rich Harris" class="h-full drop-shadow-2xl" />
		</button>
	</div>
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
