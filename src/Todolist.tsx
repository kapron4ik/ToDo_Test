import React, {useCallback} from 'react';
import {FilterValueType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    filter: FilterValueType
}

// оборачиваю компоненту в React.memo (создаю контейнерную компоненту)
// для того что бы не было перерисвоки компоненты
// если ее пропсы не изменяются
const Todolist = React.memo((props: PropsType) => {

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch();

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id))
    }, [dispatch, props.id]);

    //Вінести функции в родитель?
    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.id, 'all')), [dispatch, props.id]);
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.id, 'active')), [dispatch, props.id]);
    const onComplitedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.id, 'completed')), [dispatch, props.id]);
    const onDeleteClickHandler = useCallback(() => dispatch(removeTodolistAC(props.id)), [dispatch, props.id]);
    const onChangeTitleTodoList = useCallback((newTitle: string) => dispatch(changeTodolistTitleAC(props.id, newTitle)), [dispatch, props.id]);

    let tasksForTodolist = tasks;

    if (props.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }

    if (props.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.title} onChange={onChangeTitleTodoList}/>
                <IconButton onClick={onDeleteClickHandler}>
                    <Delete/>
                </IconButton>

            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasksForTodolist.map(t => {



                        // const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id))
                        // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        //     let newIsDoneValue = e.currentTarget.checked;
                        //     dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id))
                        // }
                        // const onChangeTitle = useCallback((newTitle: string) => {
                        //     dispatch(changeTaskTitleAC(t.id, newTitle, props.id))
                        // }, [t.id]);

                        // return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        //     <Checkbox checked={t.isDone}
                        //               color="primary"
                        //               onChange={onChangeHandler}/>
                        //     <EditableSpan value={t.title} onChange={onChangeTitle}/>
                        //     <IconButton onClick={onClickHandler}>
                        //         <Delete/>
                        //     </IconButton>
                        // </div>
                        return <Task todolistId={props.id}
                                     task={t}/>
                    })
                }
            </div>
            <div>
                <Button className={props.filter === 'all' ? "active-filter" : ""}
                        onClick={onAllClickHandler}
                        color="default"
                        variant={props.filter === 'all' ? "outlined" : "text"}>All
                </Button>
                <Button className={props.filter === 'active' ? "active-filter" : ""}
                        onClick={onActiveClickHandler}
                        color="primary"
                        variant={props.filter === 'active' ? "outlined" : "text"}>Active
                </Button>
                <Button className={props.filter === 'completed' ? "active-filter" : ""}
                        onClick={onComplitedClickHandler}
                        color="secondary"
                        variant={props.filter === 'completed' ? "outlined" : "text"}>Completed
                </Button>
            </div>
        </div>
    );
});

export default Todolist;

