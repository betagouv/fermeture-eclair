import React from 'react';
import { Link } from '../components/Link';

function FAQ() {
    return (
        <div>
            <h1>
                Une alerte a été levée, et mon repository a bien été fermé. Que faire maintenant ?
            </h1>
            <p>
                Une documentation est disponible sur le Gitbook :
                <Link
                    label="Gérer une fuite de données"
                    url="https://app.gitbook.com/o/-LrIsEqqjEjdRXwfHPAD/s/-M4-Pru_Xyamh27tzw85/gerer-sa-startup-detat-ou-de-territoires-au-quotidien/je-securise-mon-produit/gerer-une-fuite-de-donnees/je-suis-developpeur"
                    opensNewTab
                />
            </p>
        </div>
    );
}

export { FAQ };
