<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import manropeCyrillicFont from '$lib/assets/fonts/Manrope-cyrillic.woff2';
	import manropeLatinFont from '$lib/assets/fonts/Manrope-latin.woff2';
	import runicFont from '$lib/assets/fonts/Runic.ttf';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link
		rel="preload"
		href={manropeCyrillicFont}
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link rel="preload" href={manropeLatinFont} as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" href={runicFont} as="font" type="font/ttf" crossorigin="anonymous" />
</svelte:head>
{@render children()}
