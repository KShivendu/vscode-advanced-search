import { writable } from 'svelte/store';
import {vscode} from './vscode'
import type { FileResult } from 'shared/types';

let lastVscodeState: State = vscode.getState() ?? {
	searchInput: '',
	replaceInput: '',
	searchQuery: '',
	searchResults: null,
};

type State = {
	searchInput: string;
	replaceInput: string;
	searchQuery: string;
	searchResults: FileResult[] | null;
};

export const vscodeStore = writable<State>(lastVscodeState);

vscodeStore.subscribe(state => {
	vscode.setState(state);
});

window.addEventListener('message', event => {
	console.log(event.data);
	
	const message = event.data; // The JSON data our extension sent

	switch (message.command) {
		case 'searchResults':
			vscodeStore.update(state => {
				state.searchResults = message.data.searchResults;
				return state;
			});
			break;
	}
});
