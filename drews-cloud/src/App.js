import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Layout } from './components/index';
import { getLikes, mapLikeObjects } from './lib/helpers';
import { CLIENT_ID, USER_ID } from './lib/constants';

const Likes = styled.div``;
const Like = styled.div``;

const App = () => {
    const [likes, setLikes] = useState([]);
    const [nextLikesGetEndpoint, setNextGetLikesEndpoint] = useState('');
    const [page, setPage] = useState('likes');

    useEffect(() => {
        getLikes({
            userId: USER_ID,
            clientId: CLIENT_ID,
            offset: 0,
            limit: 50
        })
            .then(({ next_href, collection }) => {
                setNextGetLikesEndpoint(next_href);
                setLikes(mapLikeObjects(collection));
            })
            .catch(err => console.log(err));
    }, []);
    console.log('likes', likes);
    console.log('nextLikesGetEndpoint', nextLikesGetEndpoint);
    return (
        <Layout>
            {page === 'likes' && (
                <Likes>
                    {likes.map(({ id }) => (
                        <Like key={id} />
                    ))}
                </Likes>
            )}
        </Layout>
    );
};

export default App;
