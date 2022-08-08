import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    removeTodoList: (todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    renameTask: (id: string, newTitle: string, todolistId: string) => void
    renameTodoList: (newTitle: string, todolistId: string) => void
    filter: FilterValueType
}

const Todolist = (props: PropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onComplitedClickHandler = () => props.changeFilter('completed', props.id);
    const onDeleteClickHandler = () => props.removeTodoList(props.id)
    const onChangeTitleTodoList = (newTitle: string) => props.renameTodoList(newTitle, props.id)


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
                    props.tasks.map(t => {

                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                        }
                        const onChangeTitle = (newTitle: string) => {
                            props.renameTask(t.id, newTitle, props.id)
                        }

                        return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox checked={t.isDone}
                                      color="primary"
                                      onChange={onChangeHandler}/>
                            <EditableSpan value={t.title} onChange={onChangeTitle}/>
                            <IconButton onClick={onClickHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button className={props.filter === 'all' ? "active-filter" : ""}
                        onClick={onAllClickHandler}
                        color="default"
                        variant={props.filter === 'all'?"outlined":"text"}>All
                </Button>
                <Button className={props.filter === 'active' ? "active-filter" : ""}
                        onClick={onActiveClickHandler}
                        color="primary"
                        variant={props.filter === 'active'?"outlined":"text"}>Active
                </Button>
                <Button className={props.filter === 'completed' ? "active-filter" : ""}
                        onClick={onComplitedClickHandler}
                        color="secondary"
                        variant={props.filter === 'completed'?"outlined":"text"}>Completed
                </Button>
            </div>
        </div>
    );
};

export default Todolist;