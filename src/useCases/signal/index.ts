import axios from 'axios';
import { config } from '../../config';
import { alertPayloadType } from '../alertHandler';

const signalUseCase = { alertOnMattermost };

const MATTERMOST_BASE_URL = `https://mattermost.incubateur.net/hooks/`;

const usernamesToPing = ['anna-liva', 'julien.dauphant', 'ishan', 'florian', 'benoit.serrano'];

async function alertOnMattermost(payload: alertPayloadType) {
    const url = MATTERMOST_BASE_URL + config.MATTERMOST_HOOK_ID;
    const text1 = `Bonjour @anna-livia @julien.dauphant @ishan @florian @benoit.serrano.\nUne alerte a été déclenchée (${payload.incident.gitguardian_url}) sur le repository ${payload.occurrence.source.url}. L'auteur du commit est ${payload.occurrence.author_info} : contactez cette personne pour plus d'informations sur la fuite.`;
    await axios.post(url, { text: text1 });

    const text2 = `
    # 🚨 GitGuardian alert on "${payload.occurrence.source.fullname}"\n
    - 🦉 GitGuardian URL: ${payload.incident.gitguardian_url}\n
    - 🐱 Github commit URL: ${payload.occurrence.source.url}\n
    - 👩‍💻 developer's email adress: ${payload.occurrence.author_info}\n
    ping ${usernamesToPing.map((username) => `@${username}`).join(' ')}.\n`;
    return axios.post(url, { text: text2 });
}

export { signalUseCase };
