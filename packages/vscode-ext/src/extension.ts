// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log(
		'Congratulations, your extension "advanced-code-search" is now active!',
	);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand(
		'advanced-code-search.helloWorld',
		() => {
			// The code you place here will be executed every time your command is executed

			const panel = vscode.window.createWebviewPanel(
				'codeSearch',
				'Code Search',
				vscode.ViewColumn.One,
				{
					enableScripts: true,
				},
			);

			fs.readFile(
				path.resolve(__dirname, '../webview-dist/index.html'),
				'utf8',
			).then(html => {
				panel.webview.html = html;
			});
		},
	);
	console.log('command registered');

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
