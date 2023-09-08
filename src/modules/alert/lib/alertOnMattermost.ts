import axios from 'axios';
import { config } from '../../../config';
import { alertPayloadType } from './types';

const MATTERMOST_BASE_URL = `https://mattermost.incubateur.net/hooks/`;

const usernamesToPing = ['anna-livia', 'julien.dauphant', 'ishan', 'florian', 'benoit.serrano'];

async function alertOnMattermost(payload: alertPayloadType) {
    const url = MATTERMOST_BASE_URL + config.MATTERMOST_HOOK_ID;

    const text =
        '# 🚨 GitGuardian alert on ' +
        payload.occurrence.source.full_name +
        '\n' +
        '- 🦉 GitGuardian URL: ' +
        payload.incident.gitguardian_url +
        '\n' +
        '- 🐱 Github commit URL: ' +
        payload.occurrence.url +
        '\n' +
        "- 👩‍💻 developer's email adress: " +
        payload.occurrence.author_info +
        '\n' +
        'ping ' +
        usernamesToPing.map((username) => `@${username}`).join(' ');
    return axios.post(url, { text: text });
}

export { alertOnMattermost };
