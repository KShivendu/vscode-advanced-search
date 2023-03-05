export type Match = {
	start: {
		line: number;
		character: number;
	};
	end: {
		line: number;
		character: number;
	};
	matchText: string;
};

export type FileResult = {
	filename: string;
	matches: Match[];
};


export type Replacement = {
	startOffest: number;
	endOffset: number;
	updatedContent: string;
};

export type ReplaceResult = {
	filename: string;
	updatedFileContent: string;
	replacements: Replacement[];
}
