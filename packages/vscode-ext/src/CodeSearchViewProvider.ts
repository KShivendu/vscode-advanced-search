import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import * as path from 'path';

export class CodeSearchViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'advanced-code-search.codeSearch';
	private _view?: vscode.WebviewView;

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
		});
	}
}
