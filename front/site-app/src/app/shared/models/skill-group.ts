export class SkillGroup {
    id: number;
    title: string;

    constructor(
        id: number,
        title: string,
    ) {
        this.id = id;
        this.title = title;
    }
}

export class SelectedSkillGroup extends SkillGroup {
    isSelected: boolean;
    constructor(
        id: number,
        title: string,
        isSelected: boolean,
    ) {
        super(id, title);
        this.isSelected = isSelected;
    }
}
