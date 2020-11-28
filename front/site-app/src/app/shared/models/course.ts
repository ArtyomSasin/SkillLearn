import { Author } from './author';
import { Lesson } from './lesson';

export class Course {
    id: number;
    title: string;
    description: string;
    author: Author;
    category: any[];
    /** Уроки */
    lessons: Lesson[];

    constructor(
        id: number,
        title: string,
        description: string,
        author: Author,
        category: any[],
        lessons: Lesson[],
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.author = author;
        this.category = category;
        this.lessons = lessons;
    }
}
