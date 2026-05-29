<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import runicFont from '$lib/assets/fonts/Runic.ttf';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preload" href={runicFont} as="font" type="font/ttf" crossorigin="anonymous" />
</svelte:head>
{@render children()}
