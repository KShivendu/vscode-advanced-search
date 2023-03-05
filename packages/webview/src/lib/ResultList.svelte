<script>
	import FileResult from './FileResult.svelte';
	import { vscodeStore } from './vscodeStore';
</script>

{#if $vscodeStore.searchQuery.length > 0}
	<ul style="margin-top: 10px;">
		{#if $vscodeStore.searchResults}
			{#each $vscodeStore.searchResults as fileResult}
				<FileResult result={fileResult} />
			{:else}
				No results found
			{/each}
		{:else}
			Searching...
		{/if}
	</ul>
{:else}
	Type a query and press enter to search
{/if}
