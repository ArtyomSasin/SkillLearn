/** Типы уроков */
export enum LessonTypes {
    /** Теория */
    theory,
    /** Практика */
    practice,
    /** Видео */
    video,
}

/** Базовый класс урока */
export class Lesson {
    /** id */
    id: number;
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
        id: number,
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
