import {TaskStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string
    todolistId: string
}
export type ChangeStatusTaskActionType = {
    type: 'CHANGE-STATUS-TASK',
    taskId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTitleTaskActionType = {
    type: 'CHANGE-TITLE-TASK',
    taskId: string
    newTitleTask: string
    todolistId: string
}

type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeStatusTaskActionType
    | ChangeTitleTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TaskStateType = {};

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            let task = {id: v1(), title: action.title, isDone: false};
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = [task, ...tasks];
            return stateCopy;
        }
        case 'CHANGE-STATUS-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ?
                {...t, isDone: action.isDone} : t)
            return stateCopy;
        }
        case 'CHANGE-TITLE-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ?
                {...t, title: action.newTitleTask} : t)
            return stateCopy;
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = []
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        default:
            return state
    }
}

export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        taskId: id,
        todolistId: todolistId
    }
}
export const addTaskAC = (newTaskTitle: string, todolistId: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        title: newTaskTitle,
        todolistId: todolistId
    }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeStatusTaskActionType => {
    return {
        type: 'CHANGE-STATUS-TASK',
        taskId: taskId,
        isDone: isDone,
        todolistId: todolistId
    }
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTitleTaskActionType => {
    return {
        type: 'CHANGE-TITLE-TASK',
        taskId: taskId,
        newTitleTask: title,
        todolistId: todolistId
    }
}











