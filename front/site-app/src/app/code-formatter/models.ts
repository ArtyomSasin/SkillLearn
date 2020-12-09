import { Optional } from '@angular/core';

export class CodeToken {
    token: string;
    start: number;
    end: number;
    value: string;
    className: string;

    constructor(
        token: string,
        start: number,
        end: number,
        value: string,
        className: string | null = null,
    ) {
        this.token = token;
        this.start = start;
        this.end = end;
        this.value = value;
        this.className = className ?? 'unknown';
    }
}

export class RegexpExtractRule {
    name: string;
    regexp: RegExp;
    groups: number[];
    constructor(
        name: string,
        regexp: RegExp,
        groups: number[]
    ) {
        this.name = name;
        this.regexp = regexp;
        this.groups = groups;
    }
}


export class TokenNotEqualError implements Error {
    name: string;
    message: string;
    stack?: string | undefined;
    constructor(
        name: string,
        message: string,
        stack?: string | undefined,
    ) {
        this.name = name;
        this.message = message;
        this.stack = stack;
    }
}

export class TokenNotFoundError implements Error {
    name = 'TokenNotFound';
    message: string;
    stack?: string | undefined;
    constructor(
        message: string
    ) {
        this.message = message;
    }
}
