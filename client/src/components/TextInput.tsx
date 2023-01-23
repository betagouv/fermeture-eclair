import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

function TextInput(props: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    errorText?: string;
}) {
    return (
        <TextField
            error={!!props.errorText}
            helperText={props.errorText}
            placeholder={props.placeholder}
            value={props.value}
            onChange={onChange}
        />
    );

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        props.onChange(event.target.value);
    }
}

export { TextInput };
