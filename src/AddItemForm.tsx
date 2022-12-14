import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type PropsType = {
    addItem: (title: string) => void
}

// оборачиваю компоненту в React.memo для того что бы не было перерисвоки компоненты
// если ее пропсы не изменяются
export const AddItemForm = React.memo((props: PropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required")
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null){
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    return (
        <div>
            <TextField variant="outlined"
                       error={!!error}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       label="Title"
                       helperText={error}/>
            {/*<Button variant="contained" color="primary" onClick={addItem}>+</Button>*/}
            <IconButton color="primary" onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    );
});
