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
    limit,
    offset,
    nextLikesGetEndpoint
}) =>
    nextLikesGetEndpoint
        ? `${nextLikesGetEndpoint}?client_id=${clientId}`
        : `https://api-v2.soundcloud.com/users/${userId}/likes?client_id=${clientId}&offset=${offset}&limit=${limit}`;

export const getLikes = params => makeRequest(getLikesEndpoint(params));

const LIKE_FILEDS = [
    { id: 'artwork_url', label: 'image' },
    { id: 'duration', label: 'duration' },
    { id: 'id', label: 'id' },
    { id: 'title', label: 'title' },
    { id: 'user', label: 'user' }
];
export const mapLikeObjects = likes =>
    likes.map(({ created_at, track }) => {
        const newLikeObj = { created: created_at };
        LIKE_FILEDS.forEach(({ id, label }) => (newLikeObj[label] = track[id]));
        return newLikeObj;
    });
