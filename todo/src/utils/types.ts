import { ReactElement, ReactNode } from "react";

export interface Todo {
    id: number | null,
    title: string,
    desc: string
}

export interface TodoList extends Omit<Todo,'desc'> {
    list: string[]
}

export interface ButtonAndHandler {
    variant:'Update' | 'Delete' | 'Create',
    handler: (todo:Todo) => void    
}
