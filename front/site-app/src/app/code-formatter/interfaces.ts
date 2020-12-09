import { CodeToken } from './models';

export interface ICodeFormatter {
    language: string;
    tokens: CodeToken[];
    format(code: string): string;
    clearDuplicates(tokens: CodeToken[]): CodeToken[];
}

export interface ICodeTokenizer {
    extractTokens(code: string): CodeToken[];
}
