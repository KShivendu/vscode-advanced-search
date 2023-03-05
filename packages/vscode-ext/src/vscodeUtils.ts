import { Match } from 'shared/types';
import * as vscode from 'vscode';

export function openMatchInEditor({filepath, match}:{
    filepath: string,
    match: Match
}) {
	vscode.window.showTextDocument(vscode.Uri.file(filepath), {
		selection: new vscode.Range(
			new vscode.Position(match.start.line, match.start.character),
			new vscode.Position(match.end.line, match.end.character),
		),
		preview: true,
	});
}
