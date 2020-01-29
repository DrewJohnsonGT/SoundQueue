import React, { useEffect, useContext } from 'react';
import { Layout, Likes } from './components/index';
import { Context } from './Context';
import { getLikes, mapLikeObjects } from './lib/helpers';

const App = () => {
    const {
        state: { likes, nextLikesGetEndpoint, page },
        dispatch
    } = useContext(Context);

    useEffect(() => {
        getLikes({
            offset: 0,
            limit: 50
        })
            .then(({ next_href, collection }) => {
                dispatch({
                    type: 'LIKES_LOADED',
                    payload: mapLikeObjects(collection)
                });
                dispatch({
                    type: 'FIELDS_CHANGED',
                    payload: { nextLikesGetEndpoint: next_href }
                });
            })
            .catch(err => console.log(err));
    }, [dispatch]);
    console.log('likes', likes);
    console.log('nextLikesGetEndpoint', nextLikesGetEndpoint);
    return <Layout>{page === 'likes' && <Likes likes={likes} />}</Layout>;
};

export default App;
