import React from 'react';
import { Link as MuiLink } from '@mui/material';

function Link(props: { url: string; label: string; opensNewTab?: boolean }) {
    const newTabProps = props.opensNewTab ? { target: '_blank', rel: 'noreferrer' } : {};
    return (
        <MuiLink {...newTabProps} href={props.url}>
            {props.label}
        </MuiLink>
    );
}

export { Link };
