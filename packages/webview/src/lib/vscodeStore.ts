import { writable } from 'svelte/store';

const vscode = acquireVsCodeApi();

let lastVscodeState: State = vscode.getState() ?? {
	searchQuery: '',
	searchResults: null,
};

export type Match = {
	start: {
		line: number;
		character: number;
	};
	end: {
		line: number;
		character: number;
	};
};

export type FileResult = {
	filename: string;
	matches: Match[];
};

type State = {
	searchQuery: string;
	searchResults: FileResult[] | null;
};

export const vscodeStore = writable<State>(lastVscodeState);

vscodeStore.subscribe(state => {
	vscode.setState(state);
});
