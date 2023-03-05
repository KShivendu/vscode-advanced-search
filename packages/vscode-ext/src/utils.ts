import { exec } from 'child_process';
import { writeFileSync, unlinkSync } from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { Match, FileResult as SearchResult, ReplaceResult } from 'shared/types';


const excludeDir = ['node_modules', 'dist', 'build', '__pycache__', '.pytest_cache', '.git'];


export async function structuredSearch(query: string, dir: string, langauge: string): Promise<SearchResult[]> {
    const searchCmd = `comby -exclude-dir ${excludeDir.join(',')} ${JSON.stringify(query)} '' -json-lines -matcher ${langauge} -match-only -d ${dir}`;

    return new Promise((res, rej) => {
        exec(searchCmd, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                rej(err);
            }

            const result = stdout.split('\n').filter(line => line.length > 0)
                .map(line => JSON.parse(line)).map((result: any) => {
                    return {
                        filename: result.uri,
                        matches: result.matches.map((match: any) => {
                            return {
                                matchText: match.matched,
                                start: {
                                    line: match.range.start.line,
                                    character: match.range.start.column,
                                },
                                end: {
                                    line: match.range.end.line,
                                    character: match.range.end.column,
                                },
                            };
                        }) as Match[],
                    };
                });

            return res(result);
        });
    });
}


export async function structuredReplaceCommand(searchQuery: string, replaceQuery: string, dir: string, language: string): Promise<ReplaceResult[]> {
    const replaceCommand = `comby -exclude-dir  ${excludeDir.join(',')} ${JSON.stringify(searchQuery)} ${JSON.stringify(replaceQuery)} -json-lines -matcher ${language} -d ${dir}`;

    return new Promise((res, rej) => {
        exec(replaceCommand, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                rej(err);
            }

            const result = stdout.split('\n').filter(line => line.length > 0)
                .map(line => JSON.parse(line)).map((result: any) => {
                    return {
                        filename: result.uri,
                        updatedFileContent: result.rewritten_source,
                        replacements: result.in_place_substitutions.map((replacement: any) => {
                            return {
                                startOffset: replacement.range.start.offset,
                                endOffset: replacement.range.end.offset,
                                updatedContent: replacement.replacement_content,
                            };
                        }) as Match[],
                    };
                });

            return res(result);
        });
    });
}

export async function structuredReplace(searchQuery: string, replaceQuery: string, dir: string, language: string): Promise<ReplaceResult[]> {
    const result = await structuredReplaceCommand(searchQuery, replaceQuery, dir, language);
    console.log(result);

    // Iterate over all the results and show diff one by one (Store the result in a file and then show diff):
    // Keep this temp file common for all the results:
    // It should be in /tmp/ folder

    const tempFile = path.join(dir, 'tempFile');

    for (const file of result) {
        // Write the updated file content to the temp file
        writeFileSync(tempFile, file.updatedFileContent);

        // const git = vscode.extensions.getExtension('vscode.git').exports.getAPI(1);
        //
        let res = await vscode.commands.executeCommand(
            "vscode.diff",
            vscode.Uri.file(file.filename),
            vscode.Uri.file(tempFile),
            'Structured Replace diff'
        );

        const finalContent = await new Promise((res, rej) => {
            vscode.workspace.onDidCloseTextDocument((closedDoc) => {
                const tempWasClosed = closedDoc.fileName.endsWith('tempFile') && closedDoc.isClosed;
                if (tempWasClosed) { res(closedDoc.getText()); }
            });
        });

        writeFileSync(file.filename, finalContent);
    }

    unlinkSync(tempFile);
}
