import { exec } from 'child_process';
import { Match, FileResult as SearchResult, ReplaceResult } from 'shared/types';

export async function structuredSearch(query: string, dir: string, langauge: string): Promise<SearchResult[]> {
    const searchCmd = `comby '${query}' '' -json-lines -matcher ${langauge} -match-only -d ${dir}`;

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
                                value: match.matched,
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


export async function structuredReplace(searchQuery: string, replaceQuery: string, dir: string, language: string): Promise<ReplaceResult[]> {
    const replaceCommand = `comby '${searchQuery}' '${replaceQuery}' -json-lines -matcher ${language} -d ${dir}`;

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
