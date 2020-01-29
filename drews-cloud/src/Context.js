import React, { useReducer, createContext } from 'react';

const initialState = {
    likes: [],
    page: 'likes',
    nextLikesGetEndpoint: ''
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
        case 'LIKES_LOADED': {
            return {
                ...state,
                likes: payload
            };
        }
        case 'CHANGE_PAGE': {
            return {
                ...state,
                page: payload
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
