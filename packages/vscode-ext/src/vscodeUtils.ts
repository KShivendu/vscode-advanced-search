import { Match } from 'shared/types';
import * as vscode from 'vscode';

export function openMatchInEditor({filepath, match}:{
    filepath: string,
    match: Match
}) {
	vscode.window.showTextDocument(vscode.Uri.file(filepath), {
		selection: new vscode.Range(
			new vscode.Position(match.start.line-1, match.start.character-1),
			new vscode.Position(match.end.line-1, match.end.character-1),
		),
		preview: true,
	});
}
