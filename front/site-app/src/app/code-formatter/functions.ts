import { CodeToken } from './models';

/** Функция сортировки токенов по start */
export function SortCodeToken(t1: CodeToken, t2: CodeToken): number {
    if (t1.start === t2.start) { return 0; }
    else if (t1.start > t2.start) { return 1; }
    else { return -1; }
}

/** Возвращает массив CodeToken[], работает корректно, только если в регулярном выражении все группы обернуты в () */
export function getMatchesResult(token: string, text: string, regexp: RegExp[], index: number, color: string): CodeToken[] {
    const result: CodeToken[] = [];
    regexp.forEach(re => {
        const matches = [...matchAll(text, re)];
        if (matches && matches.length > 0) {
            matches.forEach(m => {
                const val = m[index];
                const start = indexOfGroup(m, index);
                const end = start + val.length;
                const res = { token, start, end, value: val, color };
                result.push(res);
            });
        }
    });
    return result;
}

/** matchAll regexp */
export function* matchAll(str: string, regexp: RegExp): Generator<RegExpExecArray> {
    const flags = regexp.global ? regexp.flags : regexp.flags + 'g';
    const re = new RegExp(regexp, flags);
    let match;
    do {
        match = re.exec(str);
        if (match) {
            yield match;
        }
    }
    while (match != null);
}


/** Возвращает индекс начала группы (первого символа в группе) При условии что в регулярном выражении все символы - в группах */
export function indexOfGroup(match: RegExpExecArray, index: number): number {
    let result = match.index;
    for (let i = 1; i < index; i++) {
        result += match[i].length;
    }
    return result;
}
