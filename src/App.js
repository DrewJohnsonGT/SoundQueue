import React, { useEffect, useContext } from 'react';
import { Layout, Songs, Player } from './components/index';
import { Context } from './Context';
import { getLikes } from './lib/helpers';

const App = () => {
    const {
        state: { likes, page, queue },
        dispatch
    } = useContext(Context);

    useEffect(() => {
        dispatch({
            type: 'LOADING_LIKES'
        });
        getLikes({})
            .then(({ collection, next_href }) => {
                dispatch({
                    type: 'FIELDS_CHANGED',
                    payload: { nextLikesEndpoint: next_href }
                });
                dispatch({
                    type: 'LIKES_LOADED',
                    payload: collection
                });
            })
            .catch(err => console.log(err));
    }, [dispatch]);
    return (
        <Layout>
            {page === 'likes' && (
                <Songs
                    songs={likes.filter(s => !s.queued)}
                    onSongClick={song =>
                        !song.queued &&
                        dispatch({
                            type: 'QUEUE_SONG',
                            payload: song
                        })
                    }
                />
            )}
            {page === 'queue' && <Songs songs={queue} />}
            <Player />
        </Layout>
    );
};

export default App;
