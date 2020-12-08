import { SortCodeToken } from '../functions';
import { ICodeFormatter, ICodeTokenizer } from '../interfaces';
import { CodeToken, TokenNotEqualError, TokenNotFoundError } from '../models';

export abstract class BaseCodeFormatter implements ICodeFormatter, ICodeTokenizer {
    language: string;
    tokens: CodeToken[] = [];
    private COLOR_NOT_TOKEN: string;
    constructor(language: string, colorNotToken: string = 'rgb(212, 212, 212)') {
        this.language = language;
        this.COLOR_NOT_TOKEN = colorNotToken;
    }

    public abstract extractTokens(code: string): CodeToken[];

    public format(code: string): string {
        // Извлекаем токены и сортируем их
        this.tokens = this.extractTokens(code).sort(SortCodeToken);

        // Ищем текст, который не был охвачен токенами
        let current = 0;
        const notTokens: CodeToken[] = [];
        this.tokens.forEach(t => {
            if (current < t.start) {
                const s = current;
                const e = t.start;
                const v = code.slice(s, e);
                notTokens.push({ token: 'notToken', start: s, end: e, value: v, color: this.COLOR_NOT_TOKEN });
            }
            current = t.end;
        });

        console.log('notTokens: ', notTokens);

        const allTokens = [...this.tokens].concat(notTokens).sort(SortCodeToken);
        if (allTokens.length === 0) {
            throw new TokenNotFoundError('Не удалось найти токены форматирования для кода!');
        }
        // Проверяем все ли значения совпадают
        allTokens.forEach(t => {
            const value = code.slice(t.start, t.end);
            if (t.value !== value) {
                const message = `Значение value не совпадает со значением slice(start, end),
                value: ${value}, start: ${t.start}, end: ${t.end}`;
                console.error(message);
                throw new TokenNotEqualError(t.token, message);
            }
        });

        let result = '';
        allTokens.forEach(t => {
            result = result + `<span style="color: ${t.color}">${t.value}</span>`;
        });
        return `<code lang="${this.language}">${result}</code>`;
    }
}
