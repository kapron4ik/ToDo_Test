import React from 'react';
import {TodolistsType} from "../App";
import {v1} from "uuid";


type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id);
        case 'ADD-TODOLIST':
            let newTodoListId = v1();
            let newTodoList: TodolistsType = {id: newTodoListId, title: action.title, filter: "all"}
            return [...state, newTodoList];
        case 'CHANGE-TODOLIST-TITLE':
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title;
            }
            return state;
        case 'CHANGE-TODOLIST-FILTER':
            let todolist1 = state.find(tl => tl.id === action.id)
            if (todolist1) {
                todolist1.filter = action.filter;
            }
            return state;
        default:
            throw new Error("I don't understand this type")
    }
}







