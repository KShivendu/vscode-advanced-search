import { writable } from 'svelte/store';

const vscode = acquireVsCodeApi();

let lastVscodeState = vscode.getState() ?? {};

type State = {
	searchQuery: string;
};

export const vscodeStore = writable<State>(lastVscodeState);

vscodeStore.subscribe(state => {
	vscode.setState(state);
});
