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

	const memeImages: Record<string, string> = {
		'1.png': meme1,
		'2.png': meme2,
		'3.png': meme3,
		'4.png': meme4,
		'5.png': meme5,
		'6.png': meme6,
		'7.png': meme7
	};
</script>

<div class="memes snap-start p-5 lg:p-20">
	<div class="w-full columns-1 gap-8 lg:columns-3">
		{#each memes as meme (meme.file)}
			<img src={memeImages[meme.file]} alt={meme.alt} class="mb-8 rounded-sm drop-shadow-2xl" />
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
