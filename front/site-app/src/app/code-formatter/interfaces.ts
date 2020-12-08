import { CodeToken } from './models';

export interface ICodeFormatter {
    language: string;
    tokens: CodeToken[];
    format(code: string): string;
}

export interface ICodeTokenizer {
    extractTokens(code: string): CodeToken[];
}
