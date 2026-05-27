<script lang="ts">
    import svelteLogo from '$lib/assets/logo.svg';
    import meme1 from '$lib/assets/memes/1.png';
    import meme2 from '$lib/assets/memes/2.png';
    import meme3 from '$lib/assets/memes/3.png';
    import meme4 from '$lib/assets/memes/4.png';
    import meme5 from '$lib/assets/memes/7.png';
    import meme6 from '$lib/assets/memes/5.png';
    import meme7 from '$lib/assets/memes/6.png';
</script>

<div class="memes snap-start p-5 lg:p-20">
    <div class="w-full columns-1 lg:columns-3 gap-8">
        <img src={meme1} alt="svelte meme" class="mb-8 rounded-sm drop-shadow-2xl">
        <img src={meme2} alt="svelte meme" class="mb-8 rounded-sm drop-shadow-2xl">
        <img src={meme3} alt="svelte meme" class="mb-8 rounded-sm drop-shadow-2xl">
        <img src={meme4} alt="svelte meme" class="mb-8 rounded-sm drop-shadow-2xl">
        <img src={meme5} alt="svelte meme" class="mb-8 rounded-sm drop-shadow-2xl">
        <img src={meme6} alt="svelte meme" class="mb-8 rounded-sm drop-shadow-2xl">
        <img src={meme7} alt="svelte meme" class="mb-8 rounded-sm drop-shadow-2xl">
    </div>
    <footer class="mt-10 flex flex-col lg:flex-row lg:justify-between gap-4">
        <span>created by <a href="https://t.me/sherstd">@sherstd</a> & <a href="https://t.me/KirillUdaltsov">@KirillUdaltsov</a></span>
        <div class="flex gap-3 items-center">
            <img src={svelteLogo} alt="Svelte logo" class="w-5">
            <a href="https://свелтпобеда.рф">свелтпобеда.рф</a>
        </div>
    </footer>
</div>
