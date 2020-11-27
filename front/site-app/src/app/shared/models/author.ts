import { Post } from './post';

export class Author {
    id: string;
    name: string;
    posts?: Post[];
    constructor(id: string, name: string, posts: Post[]) {
        this.id = id;
        this.name = name;
        this.posts = posts;
    }
}

