import { getMatchesResult } from '../functions';
import { CodeToken } from '../models';
import { BaseCodeFormatter } from './base';


export class DartCodeFormatter extends BaseCodeFormatter {

    /** Классы ООП, определенные пользователем */
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
        'Symbol', 'Runes', 'dynamic',
        'Object', 'Set', 'List',
        'Map', 'String', 'bool',
        'int', 'double', 'num',
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
        /(["'])(?:(?=(\\?))\2.)*?\1/, // одинарные кавычки ' и "
        /("{3})((.|\n)*?)("{3})/,
        /('{3})((.|\n)*?)('{3})/,
    ];

    private numbers = [
        /([^\w])(\d(\.){0,1}\d*)/
    ];

    private comments = [
        /(\/\/.*)/,
        /(\/\*(.|\n)*?\*\/)/
    ];

    private methods = [
        /([\w\_]+?)\(/,
    ];

    constructor() {
        super('dart');
    }

    extractTokens(code: string): CodeToken[] {
        // Получаем определенные пользователем классы и типы
        const userDefinitions = this.getUserDefinitions(code);

        // Добавляем их к types
        for (const ud of userDefinitions) {
            this.types.push(ud.value.trim());
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
        const tokens = [...commentTokens]
            .concat(stringTokens)
            .concat(userDefinitions)
            .concat(typeTokens)
            .concat(methodTokens)
            .concat(keyword1Tokens)
            .concat(keyword2Tokens)
            .concat(numberTokens)
            .concat(symbolTokens)
            ;
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
                    'type'
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
            'method'
        );
    }
    private getSymbols(code: string): CodeToken[] {
        return getMatchesResult(
            'symbol',
            code,
            this.symbols.map(_ => new RegExp(_, 'g')),
            0,
            'symbol'
        );
    }
    private getKeywords1(code: string): CodeToken[] {
        return getMatchesResult(
            'keyword1',
            code,
            this.keywords1.map(_ => new RegExp(_, 'g')),
            2,
            'keyword1'
        );
    }
    private getKeywords2(code: string): CodeToken[] {
        return getMatchesResult(
            'keyword2',
            code,
            this.keywords2.map(_ => new RegExp(_, 'g')),
            2,
            'keyword2'
        );
    }
    private getTypes(code: string): CodeToken[] {
        return getMatchesResult(
            'type',
            code,
            this.types.map(_ => new RegExp(`(^|\\W|<)(${_})(\\s|\\.|<|\\(|\;|>)`, 'g')),
            2,
            'type'
        );
    }
    private getComments(code: string): CodeToken[] {
        return getMatchesResult(
            'comment',
            code,
            this.comments.map(_ => new RegExp(_, 'gm')),
            0,
            'comment'
        );
    }
    private getStrings(code: string): CodeToken[] {
        return getMatchesResult(
            'string',
            code,
            this.strings.map(_ => new RegExp(_, 'gm')),
            0,
            'string'
        );
    }
    private getNumbers(code: string): CodeToken[] {
        return getMatchesResult(
            'number',
            code,
            this.numbers.map(_ => new RegExp(_, 'g')),
            2,
            'number'
        );
    }
}
