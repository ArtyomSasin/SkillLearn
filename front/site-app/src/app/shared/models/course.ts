import { Author } from './author';
import { Lesson } from './lesson';

export class Course {
    // Поля БД
    id: string;
    title: string;
    description: string;
    authorId: string;
    lessonIds?: string[];
    skillGroupIds?: string[];

    // Поля LazyLoading
    /** Автор */
    author?: Author;
    /** Уроки */
    lessons?: Lesson[];

    constructor(
        id: string,
        title: string,
        description: string,
        authorId: string,
        lessonIds?: string[],
        skillGroupIds?: string[],
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authorId = authorId;
        this.lessonIds = lessonIds;
        this.skillGroupIds = skillGroupIds;
    }
}


/** Маппинг course в сущность БД */
export function toDbCourse(course: Course): any {
    return {
        id: course.id,
        title: course.title,
        description:
            course.description,
        authorId: course.authorId,
        lessonIds: course.lessonIds,
        skillGroupIds: course.skillGroupIds
    };
}
