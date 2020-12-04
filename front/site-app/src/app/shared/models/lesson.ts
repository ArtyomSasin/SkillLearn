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
    authorId: string;
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
    content: string;

    constructor(
        id: string,
        authorId: string,
        title: string,
        order: number,
        type: LessonTypes,
        content: any,
        description?: string,
    ) {
        this.id = id;
        this.authorId = authorId;
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
        authorId: lesson.authorId,
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
        authorId: lesson.authorId,
        content: lesson.content,
    };
}
