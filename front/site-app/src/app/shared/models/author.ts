
export class Author {
    id: string;
    name: string;
    posts?: any[];
    constructor(id: string, name: string, posts: any[]) {
        this.id = id;
        this.name = name;
        this.posts = posts;
    }
}

