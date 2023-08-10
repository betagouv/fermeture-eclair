import axios from 'axios';
import { config } from '../../config';
import { alertPayloadType } from '../alertHandler';

const signalUseCase = { alertOnMattermost };

const MATTERMOST_BASE_URL = `https://mattermost.incubateur.net/hooks/`;

function alertOnMattermost(payload: alertPayloadType) {
    const url = MATTERMOST_BASE_URL + config.MATTERMOST_HOOK_ID;
    const text = `Bonjour @anna-livia @julien.dauphant @ishan @florian.delezenne @benoit.serrano.\nUne alerte a été levée sur le repository ${payload.occurrence.source.url} : celui-ci a été immédiatement fermé. L'auteur du commit est ${payload.occurrence.author_info} : contactez cette personne pour plus d'informations sur la fuite.`;
    return axios.post(url, { text });
}

export { signalUseCase };
