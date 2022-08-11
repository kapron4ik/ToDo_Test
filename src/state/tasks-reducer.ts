import {TaskStateType} from "../App";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

export type AddTodolistActionType = {
    type: '',
    title: string
}

type ActionType =
    RemoveTaskActionType
    | AddTodolistActionType

export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        default:
            throw new Error("I don't understand this type")
    }
}


export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        taskId: id,
        todolistId: todolistId
    }
}

export const AddTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {
        type: '',
        title: newTodolistTitle
    }
}


// function removeTask(id: string, todolistId: string) {
//     let todolistTasks = tasks[todolistId];
//     tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
//     setTasks({...tasks})
// }








