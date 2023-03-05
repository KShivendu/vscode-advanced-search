<script lang="ts">
	import type { FileResult } from 'shared/types';

	export let result: FileResult;
</script>

<details open>
	<summary style="cursor: pointer;"> {result.filename} </summary>

	<ul>
		{#each result.matches as match}
			<li style="padding-left: 20px; cursor: pointer;">
				{match.start.line}: <code>{match.matchText}</code>
			</li>
		{/each}
	</ul>
</details>
