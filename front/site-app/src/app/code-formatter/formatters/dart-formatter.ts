import { getMatchesResult } from '../functions';
import { CodeToken } from '../models';
import { BaseCodeFormatter } from './base';


export class DartCodeFormatter extends BaseCodeFormatter {
    private COLOR_SYMBOL = 'rgb(147, 147, 147)';
    private COLOR_TYPE = 'rgb(113, 198, 177)';
    private COLOR_KEYWORD1 = 'rgb(102, 155, 209)';
    private COLOR_KEYWORD2 = 'rgb(188, 138, 189)';
    private COLOR_STRING = 'rgb(206, 145, 120)';
    private COLOR_NUMBER = 'rgb(176, 200, 163)';
    private COLOR_COMMENT = 'rgb(87, 113, 70)';
    private COLOR_METHOD = 'rgb(220, 220, 169)';

    /** Классы, определенные пользователем */
    private userDefinitions = [
        { name: 'class', regexp: /(class)(\s)+([A-Za-z\_\d]*?)(\s)?(\{)/, groups: [3] },
        { name: 'class', regexp: /(class)(\s+)([A-Za-z\_\d]*?)(\s+)(extends|implements)(\s*)([A-Za-z\_\d]*?)(\{)/, groups: [3, 7] },
    ];

    private symbols = [
        '-',
        '\\.',
        '\\+',
        '=',
        ';',
        ',',
        '<',
        '>',
        '\\[',
        '\\]',
        '\\(',
        '\\)',
        '{',
        '}',
    ];

    private types = [
        /(^|\W|<)(Symbol)(\s|\.|\;|>)/,
        /(^|\W|<)(Runes)(\s|\.|\;|>)/,
        /(^|\W|<)(dynamic)(\s|\.|\;|>)/,
        /(^|\W|<)(Object)(\s|\.|\;|>)/,
        /(^|\W|<)(List)(\s|\.|<|\(|\;|>)/,
        /(^|\W|<)(Set)(\s|\.|<|\;|>)/,
        /(^|\W|<)(Map)(\s|\.|<\(|\;|>)/,
        /(^|\W|<)(String)(\s|\.|\;|>)/,
        /(^|\W|<)(bool)(\s|\.|\;|>)/,
        /(^|\W|<)(int)(\s|\.|\;|>)/,
        /(^|\W|<)(double)(\s|\.|\;|>)/,
    ];

    private keywords1 = [
        /(^|\W)(class)(\W)/,
        /(^|\W)(as)(\W)/,
        /(^|\W)(abstract)(\W)/,
        /(^|\W)(extends)(\W)/,
        /(^|\W)(implements)(\W)/,
        /(^|\W)(const)(\W)/,
        /(^|\W)(null)(\W)/,
        /(^|\W)(var)(\W)/,
        /(^|\W)(final)(\W)/,
        /(^|\W)(void)(\W)/,
        /(^|\W)(true)(\W)/,
        /(^|\W)(false)(\W)/,
        /(^|\W)(this)(\.)/,
    ];

    private keywords2 = [
        /(^|\W)(new)(\W)/,
        /(^|\W)(return)(\W)/,
        /(^|\W)(async)(\W)/,
        /(^|\W)(await)(\W)/,
    ];

    private strings = [
        /(('){1,3}((.|\n).*?)('){1,3})/,
        /(("){1,3}((.|\n).*?)("){1,3})/
    ];

    private numbers = [
        /([^\w])(\d(\.){0,1}\d*)/
    ];

    private comments = [
        /(\/\/[\s\w].*)|(\/\*(.|\n)*?\*\/)/
    ];

    private methods = [
        /([\w\_]+?)\(/,
    ];

    constructor() {
        super('dart', 'rgb(212, 212, 212)');
    }

    extractTokens(code: string): CodeToken[] {
        // Получаем определенные пользователем классы и типы
        const userDefinitions = this.getUserDefinitions(code);
        // Добавляем их к регуляркам types
        for (const ud of userDefinitions) {
            this.types.push(new RegExp(`(^|\\W|<)(${ud.value.trim()})(\\s|\\.|<|\\(|\;|>)`));
        }

        const commentTokens = this.getComments(code);
        const stringTokens = this.getStrings(code);
        const numberTokens = this.getNumbers(code);
        const typeTokens = this.getTypes(code);
        const keyword1Tokens = this.getKeywords1(code);
        const keyword2Tokens = this.getKeywords2(code);
        const symbolTokens = this.getSymbols(code);
        const methodTokens = this.getMethods(code);

        // Создаем новую переменную и кладем туда коментарии
        const tokens = [...commentTokens];

        // Добавляем в новую переменную только те строки, которых нет в коментариях
        stringTokens.forEach(s => {
            const token = commentTokens.find(c => c.start <= s.start && c.end >= s.end);
            if (!token) {
                tokens.push(s);
            }
        });

        // В другую переменную засовываем все остальные токены
        const otherTokens = [...numberTokens]
            .concat(typeTokens)
            .concat(keyword1Tokens)
            .concat(keyword2Tokens)
            .concat(symbolTokens)
            .concat(methodTokens)
            .concat(userDefinitions)
            ;

        // Добавляем в новую переменную только те токены, которых нет в tokens
        otherTokens.forEach(s => {
            const token = tokens.find(c => c.start <= s.start && c.end >= s.end) ?? null;
            if (!token) {
                tokens.push(s);
            }
        });
        return tokens;
    }

    private getUserDefinitions(code: string): CodeToken[] {
        let result: CodeToken[] = [];
        for (const _ of this.userDefinitions) {
            for (const group of _.groups) {
                const tokens = getMatchesResult(
                    _.name,
                    code,
                    [new RegExp(_.regexp, 'gm')],
                    group,
                    this.COLOR_TYPE,
                );
                result = result.concat(tokens);
            }
        }
        return result;
    }
    private getMethods(code: string): CodeToken[] {
        return getMatchesResult(
            'method',
            code,
            this.methods.map(_ => new RegExp(_, 'gm')),
            1,
            this.COLOR_METHOD
        );
    }
    private getSymbols(code: string): CodeToken[] {
        return getMatchesResult(
            'symbol',
            code,
            this.symbols.map(_ => new RegExp(_, 'g')),
            0,
            this.COLOR_SYMBOL
        );
    }
    private getKeywords1(code: string): CodeToken[] {
        return getMatchesResult(
            'keyword1',
            code,
            this.keywords1.map(_ => new RegExp(_, 'g')),
            2,
            this.COLOR_KEYWORD1
        );
    }
    private getKeywords2(code: string): CodeToken[] {
        return getMatchesResult(
            'keyword2',
            code,
            this.keywords2.map(_ => new RegExp(_, 'g')),
            2,
            this.COLOR_KEYWORD2
        );
    }
    private getTypes(code: string): CodeToken[] {
        return getMatchesResult(
            'type',
            code,
            this.types.map(_ => new RegExp(_, 'g')),
            2,
            this.COLOR_TYPE
        );
    }
    private getComments(code: string): CodeToken[] {
        return getMatchesResult(
            'comment',
            code,
            this.comments.map(_ => new RegExp(_, 'gm')),
            0,
            this.COLOR_COMMENT
        );
    }
    private getStrings(code: string): CodeToken[] {
        return getMatchesResult(
            'string',
            code,
            this.strings.map(_ => new RegExp(_, 'gm')),
            0,
            this.COLOR_STRING
        );
    }
    private getNumbers(code: string): CodeToken[] {
        return getMatchesResult(
            'number',
            code,
            this.numbers.map(_ => new RegExp(_, 'g')),
            2,
            this.COLOR_NUMBER
        );
    }
}
