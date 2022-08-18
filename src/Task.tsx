import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type PropsTaskType = {
    todolistId: string
    task: TaskType
}
export const Task = React.memo((props: PropsTaskType) => {

    const dispatch = useDispatch();

    const onClickHandler = () => dispatch(removeTaskAC(props.task.id, props.todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId))
    }
    const onChangeTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newTitle, props.todolistId))
    }, [dispatch, props.task.id, props.todolistId]);

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox checked={props.task.isDone}
                  color="primary"
                  onChange={onChangeHandler}/>
        <EditableSpan value={props.task.title} onChange={onChangeTitle}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
});