import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button } from './components/Button';
import { TextInput } from './components/TextInput';
import { api } from './service/api';
import { Link } from './components/Link';

function App() {
    const [githubToken, setGithubToken] = useState('');
    const [repositoryName, setRepositoryName] = useState('');
    const [repositoryOwner, setRepositoryOwner] = useState('');
    return (
        <Container>
            <InputContainer>
                <TextInput
                    value={githubToken}
                    onChange={setGithubToken}
                    placeholder="Token Github"
                />
                <Link
                    label="Créer un token"
                    url="https://github.com/settings/personal-access-tokens/new"
                    opensNewTab
                />
            </InputContainer>
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
    width: 50%;
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled('div')`
    flex: 1;
    display: flex;
    justify-content: space-between;
`;

export default App;
