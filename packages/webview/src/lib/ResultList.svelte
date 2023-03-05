<script>
	import { vscodeStore } from './vscodeStore';
</script>

{#if $vscodeStore.searchQuery.length > 0}
	<ul>
		{#if $vscodeStore.searchResults}
			{#each $vscodeStore.searchResults as fileResult}
				<li>{fileResult.filename}</li>
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
