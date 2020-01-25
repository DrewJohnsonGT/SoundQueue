const makeRequest = endpoint => {
    fetch(endpoint, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*'
        }
    }).then(response => {
        console.log(response);
    });
};

const getLikesEndpoint = ({ userId, clientId, limit, offset }) =>
    `https://api-v2.soundcloud.com/users/${userId}/likes?client_id=${clientId}&offset=${offset}&limit=${limit}`;

export const getLikes = ({ userId, clientId, limit, offset }) =>
    makeRequest(getLikesEndpoint({ userId, clientId, limit, offset }));
