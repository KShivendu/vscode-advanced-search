import { writable } from 'svelte/store';
import type { FileResult } from 'shared/types';

const vscode = acquireVsCodeApi();

let lastVscodeState: State = vscode.getState() ?? {
	searchInput: '',
	searchQuery: '',
	searchResults: null,
};

export type Match = {
	value: string;
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
	searchInput: string;
	searchQuery: string;
	searchResults: FileResult[] | null;
};

export const vscodeStore = writable<State>(lastVscodeState);

vscodeStore.subscribe(state => {
	vscode.setState(state);
});
