import { Author } from './author';
import { Lesson } from './lesson';

export class Course {
    id: string;
    title: string;
    description: string;
    author: Author;
    category: any[];
    /** Уроки */
    lessons?: Lesson[];
    lessonIds?: string[];

    skillIds?: string[];

    constructor(
        id: string,
        title: string,
        description: string,
        author: Author,
        category: any[],
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.author = author;
        this.category = category;
    }
}
