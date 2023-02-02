import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button } from './components/Button';
import { TextInput } from './components/TextInput';
import { api } from './service/api';
import { Link } from './components/Link';
import { Toaster } from './components/Toaster';

const DEFAULT_REPOSITORY_OWNER = 'betagouv';

function App() {
    const [toaster, setToaster] = React.useState({
        variant: 'success' as 'success' | 'error',
        text: '',
    });

    const [githubToken, setGithubToken] = useState('');
    const [repositoryName, setRepositoryName] = useState('');
    const [repositoryOwner, setRepositoryOwner] = useState(DEFAULT_REPOSITORY_OWNER);
    return (
        <Container>
            <InputContainer>
                <TextInput
                    value={githubToken}
                    onChange={setGithubToken}
                    placeholder="Token Github"
                />
                <Link
                    label="Générer un token"
                    url="https://github.com/settings/personal-access-tokens/new"
                    opensNewTab
                />
            </InputContainer>
            <div>
                <ul>Mettre en token name le nom de la SE</ul>
                <ul>Mettre en Expiration une durée d'un an</ul>
                <ul>Sélectionner le Resource Owner</ul>
                <ul>Cliquer sur "Only select repositories"</ul>
                <ul>Sélectionner les repositories concernés</ul>
                <ul>
                    Dans Repositories permissions, ajouter "Administration" et sélectionner Read and
                    write"
                </ul>
                <ul>Cliquer sur Generate token</ul>
            </div>
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
            <Toaster
                isOpen={!!toaster.text}
                text={toaster.text}
                variant={toaster.variant}
                onClose={() => setToaster({ variant: 'success', text: '' })}
            />
        </Container>
    );

    async function handleSubmit() {
        const response = await api.createGithubToken({
            githubToken,
            repositoryName,
            repositoryOwner,
        });
        if (response.ok) {
            setGithubToken('');
            setRepositoryName('');
            setToaster({ variant: 'success', text: 'Le token a bien été créé.' });
        } else {
            console.warn(response.statusText);
            setToaster({ variant: 'error', text: 'La création de token a échoué.' });
        }
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
