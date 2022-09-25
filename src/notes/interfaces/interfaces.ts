export type NoteType = {
    name: string,
    category: string,
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