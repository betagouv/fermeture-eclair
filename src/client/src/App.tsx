import React, { useState } from 'react';
import { Button } from './components/Button';
import { TextInput } from './components/TextInput';
import { api } from './service/api';

const INITIAL_ERRORS = { expirationDate: '' };

function App() {
    const [githubToken, setGithubToken] = useState('');
    const [repositoryName, setRepositoryName] = useState('');
    const [repositoryOwner, setRepositoryOwner] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [errors, setErrors] = useState(INITIAL_ERRORS);
    return (
        <div>
            <TextInput value={githubToken} onChange={setGithubToken} placeholder="Token Github" />
            <TextInput
                errorText={errors.expirationDate}
                value={expirationDate}
                onChange={setExpirationDate}
                placeholder="Date d'expiration"
            />
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
        </div>
    );

    function handleSubmit() {
        const DATE_PATTERN = /^2[0-9]{3}-[0,1][0-9]-[0-3][0-9]$/;
        if (!expirationDate.match(DATE_PATTERN)) {
            setErrors({ ...errors, expirationDate: 'Mauvais format' });
            return;
        } else {
            setErrors(INITIAL_ERRORS);
        }
        api.createGithubToken({
            githubToken,
            expirationDate,
            repositoryName,
            repositoryOwner,
        });
    }
}

export default App;
