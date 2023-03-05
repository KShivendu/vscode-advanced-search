<script>
	import {
		provideVSCodeDesignSystem,
		vsCodeButton,
		vsCodeTextArea,
		vsCodeTextField,
	} from '@vscode/webview-ui-toolkit';
	import SearchIcon from './SearchIcon.svelte';
	import { vscode } from './vscode';
	import { vscodeStore } from './vscodeStore';

	provideVSCodeDesignSystem().register(vsCodeButton(), vsCodeTextArea());
</script>

<vscode-text-area
	value={$vscodeStore.searchInput}
	on:input={e => {
		$vscodeStore.searchInput = e.target.value;
	}}
	name="searchQuery"
	placeholder="Search query"
	autofocus
	style="width: 100%;"
/>

<vscode-text-area
	value={$vscodeStore.replaceInput}
	on:input={e => {
		$vscodeStore.replaceInput = e.target.value;
	}}
	name="replaceQuery"
	placeholder="Replace query"
	autofocus
	style="width: 100%;"
/>

<vscode-button
	type="submit"
	style="width: 100%; margin-bottom: 4px;"
	on:click={() => {
		$vscodeStore.searchQuery = $vscodeStore.searchInput;
		$vscodeStore.replaceQuery = $vscodeStore.replaceInput;
		if ($vscodeStore.searchQuery) {
			console.log({ vscode });
			$vscodeStore.searchResults = null;
			vscode.postMessage({
				command: 'searchQuery',
				data: {
					searchQuery: $vscodeStore.searchQuery,
				},
			});
			console.log('postMessage');
		}
	}}
>
	<span slot="start"><SearchIcon /></span>
	Search
</vscode-button>

<vscode-button
	type="button"
	style="width: 100%;"
	on:click={() => {
		$vscodeStore.searchQuery = $vscodeStore.searchInput;
		$vscodeStore.replaceQuery = $vscodeStore.replaceInput;
		if ($vscodeStore.searchQuery) {
			console.log({ vscode });
			$vscodeStore.searchResults = null;
			vscode.postMessage({
				command: 'replaceQuery',
				data: {
					searchQuery: $vscodeStore.searchQuery,
					replaceQuery: $vscodeStore.replaceQuery,
				},
			});
			console.log('postMessage');
		}
	}}
>
	Replace
</vscode-button>
