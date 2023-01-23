import React from 'react';
import MuiButton from '@mui/material/Button';

function Button(props: { onClick: () => void; label: string }) {
    return <MuiButton onClick={props.onClick}>{props.label}</MuiButton>;
}

export { Button };
