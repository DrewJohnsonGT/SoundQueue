import { CLIENT_ID, USER_ID } from './constants';

const makeRequest = async endpoint => {
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

export const getLikes = params => makeRequest(getLikesEndpoint(params));

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
