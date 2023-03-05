<script lang="ts">
	import type { FileResult } from 'shared/types';
  import { vscode } from './vscode';

	export let result: FileResult;
</script>

<details open>
	<summary style="cursor: pointer;"> {result.filename} </summary>

	<ul>
		{#each result.matches as match}
			<li style="padding-left: 20px; cursor: pointer;" role="button" on:click={() => {
				vscode.postMessage({
					command: 'openMatchInEditor',
					data: {
						filepath: result.filename,
						match
					}
				})
			}}>
				{match.start.line}: <code>{match.matchText}</code>
			</li>
		{/each}
	</ul>
</details>
