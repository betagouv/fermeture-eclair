import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button } from './components/Button';
import { TextInput } from './components/TextInput';
import { api } from './service/api';

function App() {
    const [githubToken, setGithubToken] = useState('');
    const [repositoryName, setRepositoryName] = useState('');
    const [repositoryOwner, setRepositoryOwner] = useState('');
    return (
        <Container>
            <TextInput value={githubToken} onChange={setGithubToken} placeholder="Token Github" />
            <TextInput
                value={repositoryName}
                onChange={setRepositoryName}
                placeholder="Nom du dépôt"
            />
            <TextInput
                value={repositoryOwner}
                onChange={setRepositoryOwner}
                placeholder="Propriétaire du dépôt"
            />
            <Button label="Créer token" onClick={handleSubmit} />
        </Container>
    );

    function handleSubmit() {
        api.createGithubToken({
            githubToken,
            repositoryName,
            repositoryOwner,
        });
    }
}

const Container = styled('div')`
    width: 25%;
    display: flex;
    flex-direction: column;
`;

export default App;
