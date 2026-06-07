<script lang="ts">
	import svelteLogo from '$lib/assets/logo.svg';
	import memes from '$lib/data/memes.json';
	import meme1 from '$lib/assets/memes/1.png';
	import meme2 from '$lib/assets/memes/2.png';
	import meme3 from '$lib/assets/memes/3.png';
	import meme4 from '$lib/assets/memes/4.png';
	import meme5 from '$lib/assets/memes/5.png';
	import meme6 from '$lib/assets/memes/6.png';
	import meme7 from '$lib/assets/memes/7.png';

	const memeImages: Record<string, { src: string; width: number; height: number }> = {
		'1.png': { src: meme1, width: 1080, height: 952 },
		'2.png': { src: meme2, width: 500, height: 714 },
		'3.png': { src: meme3, width: 576, height: 452 },
		'4.png': { src: meme4, width: 640, height: 480 },
		'5.png': { src: meme5, width: 500, height: 641 },
		'6.png': { src: meme6, width: 1284, height: 943 },
		'7.png': { src: meme7, width: 802, height: 500 }
	};
</script>

<div class="memes snap-start p-5 lg:p-20">
	<div class="w-full columns-1 gap-8 lg:columns-3">
		{#each memes as meme (meme.file)}
			{@const image = memeImages[meme.file]}
			<img
				src={image.src}
				alt={meme.alt}
				width={image.width}
				height={image.height}
				class="mb-8 block w-full break-inside-avoid rounded-sm drop-shadow-2xl"
				loading="lazy"
				decoding="async"
			/>
		{/each}
	</div>
	<footer class="mt-10 flex flex-col gap-4 lg:flex-row lg:justify-between">
		<span
			>created by <a href="https://t.me/sherstd">@sherstd</a> &
			<a href="https://t.me/KirillUdaltsov">@KirillUdaltsov</a></span
		>
		<div class="flex items-center gap-3">
			<img src={svelteLogo} alt="Svelte logo" class="w-5" />
			<a href="https://свелтпобеда.рф">свелтпобеда.рф</a>
		</div>
	</footer>
</div>
