import { exec } from 'child_process';
import { Match, FileResult } from '../../webview/src/lib/vscodeStore';

export async function structuredSearch(query: string, dir: string, langauge: string): Promise<FileResult[]> {

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
                                start: {
                                    line: match.range.start.line,
                                    character: match.range.start.column,
                                },
                                end: {
                                    line: match.range.end.line,
                                    character: match.range.end.column,
                                },
                            };
                        }),
                    };
                });

            return res(result);
        });
    });

    return [];
}
