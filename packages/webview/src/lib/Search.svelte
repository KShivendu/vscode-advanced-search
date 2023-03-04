<script>
	import {
		provideVSCodeDesignSystem,
		vsCodeButton,
		vsCodeTextField,
	} from '@vscode/webview-ui-toolkit';
	import SearchIcon from './SearchIcon.svelte';
	import { vscodeStore } from './vscodeStore';

	provideVSCodeDesignSystem().register(vsCodeTextField(), vsCodeButton());
</script>

<vscode-text-field
	value={$vscodeStore.searchQuery}
	on:input={e => {
		$vscodeStore.searchQuery = e.target.value;
	}}
	placeholder="Search query"
	autofocus
	style="width: 100%;"
>
	<div slot="start" style="display: flex; align-items: center;">
		<SearchIcon />
	</div>
</vscode-text-field>
