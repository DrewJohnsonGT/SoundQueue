import { CLIENT_ID, USER_ID } from './constants';

const makeGetRequest = async endpoint => {
    const preflightResponse = await fetch(endpoint, {
        method: 'OPTIONS'
    });
    if (preflightResponse.status === 200) {
        const response = await fetch(endpoint, {
            method: 'GET'
        });
        const responseJSON = await response.json();
        return responseJSON;
    }
    return { error: 'Failed Preflight Check' };
};

const makePostRequest = async ({ endpoint, body }) => {
    const preflightResponse = await fetch(endpoint, {
        method: 'OPTIONS'
    });
    if (preflightResponse.status === 200) {
        const response = await fetch(endpoint, {
            method: 'POST',
            body
        });
        const responseJSON = await response.json();
        return responseJSON;
    }
    return { error: 'Failed Preflight Check' };
};

const getLikesEndpoint = ({
    userId = USER_ID,
    clientId = CLIENT_ID,
    limit = 50,
    offset = 0,
    nextLikesEndpoint
}) =>
    nextLikesEndpoint
        ? `${nextLikesEndpoint}&limit=${limit}&client_id=${clientId}`
        : `https://api-v2.soundcloud.com/users/${userId}/likes?client_id=${clientId}&offset=${offset}&limit=${limit}`;

export const getLikes = endpointParams =>
    makeGetRequest(getLikesEndpoint(endpointParams));

const LIKE_FILEDS = [
    { id: 'artwork_url', label: 'image' },
    { id: 'duration', label: 'duration' },
    { id: 'id', label: 'id' },
    { id: 'title', label: 'title' },
    { id: 'user', label: 'user' },
    { id: 'uri', label: 'uri' }
];
export const mapLikeObjects = likes =>
    likes
        .map(({ created_at, track }) => {
            const newLikeObj = { created: created_at, queued: false };
            if (!track) return null;
            LIKE_FILEDS.forEach(
                ({ id, label }) => (newLikeObj[label] = track[id])
            );
            return newLikeObj;
        })
        .filter(Boolean);

export const getSongTime = ms => {
    const minutes = Math.floor(ms / 1000 / 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// OPTIONS
// https://api-v2.soundcloud.com/sign-in/password?client_id=wJ3iwkqswthCXMGaBX9lJeIZAIshvKtV&app_version=1580811218&app_locale=en

// POST
// https://api-v2.soundcloud.com/sign-in/password?client_id=wJ3iwkqswthCXMGaBX9lJeIZAIshvKtV&app_version=1580811218&app_locale=en
// {"client_id":"wJ3iwkqswthCXMGaBX9lJeIZAIshvKtV","scope":"fast-connect non-expiring purchase signup upload","recaptcha_pubkey":"6LeAxT8UAAAAAOLTfaWhndPCjGOnB54U1GEACb7N","recaptcha_response":null,"credentials":{"identifier":"sdrewjohnson@aol.com","password":"Peanut.1604"},"signature":"8:33-1-40918-519-921600-1046-14-14:8e570e:3","device_id":"432800-401555-423063-148990","user_agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36"}

const getAuthEndpoint = ({ clientId = CLIENT_ID }) =>
    `https://api-v2.soundcloud.com/sign-in/password?client_id=${clientId}`;

export const authenticateUser = async () => {
    makePostRequest(
        getAuthEndpoint({ endpoint: getAuthEndpoint({}), body: {} })
    );
};
