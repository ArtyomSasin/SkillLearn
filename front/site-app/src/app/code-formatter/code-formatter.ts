import { DartCodeFormatter } from './formatters/dart-formatter';
import { ICodeFormatter } from './interfaces';

export class CodeFormatter {
    private formatters: ICodeFormatter[] = [
        new DartCodeFormatter(),
    ];

    public format(language: string, code: string): string {
        const languages = this.formatters.map(_ => _.language);
        const formatter = this.formatters.find(_ => _.language.toUpperCase() === language.toUpperCase());
        if (!formatter) {
            throw new Error(`Для данного языка (${language}), не найдено средство форматирования. Доступны следующие языки: ${languages.join('; ')}`);
        }
        const formatCode = formatter.format(code);
        return `<pre class="${formatter.language} code black"><div class="code-label">Язык: ${language}</div>${formatCode}</pre></br>`;
    }
}
