export type NoteType = {
    name: string,
    category: CategoryType,
    content: string,
    created: number,
    dates: string
}

type State = {
    active: number,
    archived: number
}

export type Stat = {
    name: string,
    state: State
}

export enum CategoryType {
    TASK = "Task",
    RANDOMTHOUGHT = "Random Thought",
    IDEA = "Idea"
}