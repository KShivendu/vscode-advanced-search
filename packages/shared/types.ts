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
