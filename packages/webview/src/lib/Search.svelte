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

<form
	on:submit|preventDefault={e => {
		$vscodeStore.searchQuery = e.target.searchQuery.value;
		if ($vscodeStore.searchQuery) {
			console.log({vscode});
			$vscodeStore.searchResults=null;
			vscode.postMessage({
				command: 'searchQuery',
				data: {
					searchQuery: $vscodeStore.searchQuery,
				}
			});
			console.log('postMessage');
		}
	}}
>
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

	<vscode-button type="submit" style="width: 100%;">
		<span slot="start"><SearchIcon /></span>
		Search
	</vscode-button>
</form>
