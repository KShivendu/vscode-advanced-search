<script lang="ts">
	import type { FileResult } from './vscodeStore';

	export let result: FileResult;
</script>

<details open>
	<summary style="cursor: pointer;"> {result.filename} </summary>

	<ul>
		{#each result.matches as match}
			<li style="padding-left: 20px;">
				{match.start.line}: <code>import '...'</code>
			</li>
		{/each}
	</ul>
</details>
