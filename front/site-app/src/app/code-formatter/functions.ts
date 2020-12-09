import { CodeToken } from './models';

/** Функция сортировки токенов по start */
export function SortCodeToken(t1: CodeToken, t2: CodeToken): number {
    const l1 = t1.value.length;
    const l2 = t2.value.length;
    // l1 и l2 сортируем  наоборот (по убыванию)
    if (t1.start === t2.start) {
        if (l1 === l2) { return 0; }
        return l1 > l2 ? -1 : 1;
    }
    return t1.start < t2.start ? -1 : 1;
}

/** Возвращает массив CodeToken[], работает корректно, только если в регулярном выражении все группы обернуты в () */
export function getMatchesResult(token: string, text: string, regexp: RegExp[], index: number, className: string): CodeToken[] {
    const result: CodeToken[] = [];
    regexp.forEach(re => {
        const matches = [...matchAll(text, re)];
        if (matches && matches.length > 0) {
            matches.forEach(m => {
                const val = m[index];
                const start = indexOfGroup(m, index);
                const end = start + val.length;
                const res = { token, start, end, value: val, className };
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
