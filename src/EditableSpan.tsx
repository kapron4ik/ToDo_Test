import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type PropsTypeSpan = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: PropsTypeSpan) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.value)

    const addItem = () => {
        if (title.trim() !== "") {
            props.onChange(title);
        } else {
            setTitle(props.value)
        }
    };
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            setEditMode(false)
            addItem();
        }
    }
    const activateViewMode = () => {
        setEditMode(false);
        addItem()
        // props.onChange(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField variant="outlined"
                     value={title}
                     onChange={changeTitle}
                     onKeyPress={onKeyPressHandler}
                     autoFocus
                     onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
})