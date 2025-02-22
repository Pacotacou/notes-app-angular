export interface Note{
    id: number;
    title: string;
    text: string;
    
}

export const NOTES: Note[] = [
    {id: 1, title: 'Note 1', text: 'This is the first note'},
    {id: 2, title: 'Note 2', text: 'This is the second note'},
    {id: 3, title: 'Note 3', text: 'This is the third note'},
];