/** Типы уроков */
export enum LessonTypes {
    /** Теория */
    theory = 1,
    /** Практика */
    practice = 2,
    /** Видео */
    video = 3,
}

/** Базовый класс урока */
export class Lesson {
    /** id */
    id: string;
    /** Название */
    title: string;
    /** Описание (необязательно) */
    description?: string;
    /** Порядковый номер урока */
    order: number;
    /** Тип урока */
    type: LessonTypes;
    /** Контент */
    content: any;

    constructor(
        id: string,
        title: string,
        order: number,
        type: LessonTypes,
        content: any,
        description?: string,
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.order = order;
        this.type = type;
        this.content = content;
    }
}
