import { SortCodeToken } from '../functions';
import { ICodeFormatter, ICodeTokenizer } from '../interfaces';
import { CodeToken, TokenNotEqualError, TokenNotFoundError } from '../models';

export abstract class BaseCodeFormatter implements ICodeFormatter, ICodeTokenizer {
    language: string;
    tokens: CodeToken[] = [];

    constructor(language: string) {
        this.language = language;
    }

    /** Извлечение токенов */
    public abstract extractTokens(code: string): CodeToken[];

    /** Очищает токены от дубликатов и вхождений друг в друга */
    public clearDuplicates(tokens: CodeToken[]): CodeToken[] {
        const result: CodeToken[] = [];

        // Добавляем в новую переменную только те строки, которых нет в Результирующем наборе
        tokens.forEach(s => {
            const token = result.find(c => c.start <= s.start && c.end >= s.end);
            if (!token) {
                result.push(s);
            }
        });
        return result;
    }

    public format(code: string): string {
        // Извлекаем токены и сортируем их
        this.tokens = this.extractTokens(code).sort(SortCodeToken);
        console.log('before clear: ', this.tokens);
        // Очищаем от дубликатов
        this.tokens = this.clearDuplicates(this.tokens);
        console.log('after clear: ', this.tokens);
        // Ищем текст, который не был охвачен токенами
        let current = 0;
        const notTokens: CodeToken[] = [];
        this.tokens.forEach(t => {
            if (current < t.start) {
                const s = current;
                const e = t.start;
                const v = code.slice(s, e);
                notTokens.push(new CodeToken('notToken', s, e, v));
            }
            current = t.end;
        });

        if (current < code.length) {
            const s = current;
            const e = code.length;
            const v = code.slice(s, e);
            notTokens.push(new CodeToken('notToken', s, e, v));
        }

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
            result = result + `<span class="${t.className}">${t.value}</span>`;
        });
        return `<code class="${this.language} code black" lang="${this.language}">${result}</code>`;
    }
}
