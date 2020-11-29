/** Типы уроков */
export enum LessonTypes {
    /** Теория */
    theory = 1,
    /** Практика */
    practice = 2,
    /** Домашняя работа */
    homeWork = 3,
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

/** Маппинг lesson в сущность БД */
export function toDbLesson(lesson: Lesson): any {
    return {
        id: lesson.id,
        title: lesson.title,
        description:
            lesson.description,
        order: lesson.order,
        type: lesson.type,
    };
}

/** Маппинг content в сущность БД */
export function toDbContent(lesson: Lesson): any {
    return {
        id: lesson.id,
        content: lesson.content,
    };
}
