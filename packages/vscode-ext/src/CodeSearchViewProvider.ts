import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import * as path from 'path';
import { structuredReplace, structuredSearch } from './utils';
import { openMatchInEditor } from './vscodeUtils';

export class CodeSearchViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'advanced-code-search.codeSearch';
	private _view?: vscode.WebviewView;

	constructor(private readonly _context: vscode.ExtensionContext) {

	}

	resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext<unknown>,
		token: vscode.CancellationToken,
	): void {
		this._view = webviewView;

		webviewView.webview.options = {
			enableScripts: true,
		};

		fs.readFile(
			path.resolve(__dirname, '../webview-dist/index.html'),
			'utf8',
		).then(html => {
			webviewView.webview.html = html;

			webviewView.webview.onDidReceiveMessage(message => {
				const run = async () => {
					
					switch (message.command) {
						case 'searchQuery': {
							console.log('search command received');
							
							const searchQuery = message.data.searchQuery as string;
							console.log('searchQuery: ', searchQuery);
							const workspacePath = vscode.workspace.workspaceFolders?.[0].uri.path ?? '/home/shivendu/projects/vscode-advanced-search/demo';
							if (!workspacePath) {
								vscode.window.showErrorMessage('Please open a workspace first');
								return;
							}
							const language = `.${ 'js'}`;

							console.log(`workspacePath: ${workspacePath} language: ${language}`);

							
							const result = await structuredSearch(searchQuery, workspacePath, language);
							console.log(result);
							webviewView.webview.postMessage({
								command: 'searchResults',
								data:{searchResults: result}
							});
							console.log('searchResults sent');
							
							break;
						}
						case 'replaceQuery': {
							console.log("Replace command recieved");

							const searchQuery = message.data.searchQuery as string;
							const replaceQuery = message.data.replaceQuery as string;
							const workspacePath = vscode.workspace.workspaceFolders?.[0].uri.path ?? '/home/shivendu/projects/vscode-advanced-search/demo';
							if (!workspacePath) {
								vscode.window.showErrorMessage('Please open a workspace first');
								return;
							}
							const language = `.${ 'js'}`;

							console.log(`workspacePath: ${workspacePath} language: ${language}`);
							console.log(`searchQuery: ${searchQuery} replaceQuery: ${replaceQuery}`);
							

							await structuredReplace(searchQuery, replaceQuery, workspacePath, language);

							webviewView.webview.postMessage({
								command: 'searchResults',
								data:{searchResults: []}
							});

							break;
						}
						case 'openMatchInEditor': {
							console.log(message.data);
							
							openMatchInEditor(message.data);
						}
					}
				};
				run();
			}, undefined, this._context.subscriptions);
		});
	}
}
