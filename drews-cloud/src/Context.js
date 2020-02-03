import React, { useReducer, createContext } from 'react';
import { mapLikeObjects } from './lib/helpers';
const initialState = {
    likes: [],
    queue: [],
    page: 'likes',
    nextLikesEndpoint: '',
    loadingLikes: true,
    isPlaying: false,
    progress: 0,
    buffered: 0
};

const Context = createContext(initialState);

const reducer = (state, action) => {
    const { type, payload } = action;
    console.log(type);
    switch (type) {
        case 'FIELDS_CHANGED': {
            return {
                ...state,
                ...payload
            };
        }
        case 'LOADING_LIKES': {
            return {
                ...state,
                loadingLikes: true
            };
        }
        case 'LIKES_LOADED': {
            const likeObjects = mapLikeObjects(payload);
            const newLikes = state.likes.concat(likeObjects);
            return {
                ...state,
                likes: newLikes,
                offset: state.offset + 50,
                loadingLikes: false
            };
        }
        case 'CHANGE_PAGE': {
            return {
                ...state,
                page: payload
            };
        }
        case 'QUEUE_SONG': {
            const { likes, queue } = state;
            const newLikes = likes.map(like =>
                like.id === payload.id ? { ...like, queued: true } : like
            );
            queue.push(payload);
            return {
                ...state,
                likes: newLikes,
                queue
            };
        }
        case 'PLAY': {
            return {
                ...state,
                isPlaying: true
            };
        }
        case 'PAUSE': {
            return {
                ...state,
                isPlaying: false
            };
        }
        case 'NEXT_SONG': {
            const { queue, likes } = state;
            const currentSong = queue[0];
            const newLikes = likes.map(like =>
                like.id === currentSong.id ? { ...like, queued: false } : like
            );
            queue.shift();
            return {
                ...state,
                likes: newLikes,
                progress: 0,
                buffered: 0,
                queue
            };
        }
        case 'SONG_PROGRESS': {
            return {
                ...state,
                ...payload
            };
        }
        default:
            return state;
    }
};
const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
};

export { Context, Provider };
