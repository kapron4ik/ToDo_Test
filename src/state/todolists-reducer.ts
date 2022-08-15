import {FilterValueType, TodolistsType} from "../AppWithRedux";
import {v1} from "uuid";


type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValueType
}

const initialState: Array<TodolistsType> = [];

export const todolistsReducer = (state: Array<TodolistsType> = initialState, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            const stateCopy = [...state];
            return stateCopy.filter(t => t.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            const stateCopy = [...state];
            let newTodoListId = action.todolistId;
            let newTodoList: TodolistsType = {id: newTodoListId, title: action.title, filter: "all"}
            return [...stateCopy, newTodoList];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const stateCopy = [...state];
            let todolist = stateCopy.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title;
            }
            return stateCopy;
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const stateCopy = [...state];
            let todolist = stateCopy.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter;
            }
            return stateCopy;
        }
        default:
            return state
    }
}


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    }
}

export const addTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle,
        todolistId: v1()
    }
}

export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId,
        title: newTodolistTitle
    }
}

export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValueType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId,
        filter: newFilter
    }
}








