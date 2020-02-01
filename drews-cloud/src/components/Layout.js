import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../Context';
import { getLikes } from '../lib/helpers';
import { COLORS } from '../lib/constants';
import NavBar from './NavBar';
import ControlBar from './ControlBar';

const SCROLL_THRESHOLD = 5;

const Root = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: ${COLORS.darkGray};
`;

const Content = styled.div`
    overflow: auto;
    flex: 1;
`;
const Layout = ({ children }) => {
    const {
        state: { nextLikesEndpoint, loadingLikes, page },
        dispatch
    } = useContext(Context);
    return (
        <Root>
            <Content
                onScroll={({
                    target: { scrollHeight, scrollTop, clientHeight }
                }) => {
                    if (loadingLikes || page === 'queue') return;
                    if (
                        scrollHeight -
                            (scrollTop +
                                scrollTop * (SCROLL_THRESHOLD / 100)) <=
                        clientHeight
                    ) {
                        dispatch({
                            type: 'LOADING_LIKES'
                        });
                        getLikes({ nextLikesEndpoint }).then(
                            ({ collection, next_href }) => {
                                dispatch({
                                    type: 'FIELDS_CHANGED',
                                    payload: { nextLikesEndpoint: next_href }
                                });
                                dispatch({
                                    type: 'LIKES_LOADED',
                                    payload: collection
                                });
                            }
                        );
                    }
                }}
            >
                {children}
            </Content>
            <ControlBar />
            <NavBar />
        </Root>
    );
};

export default Layout;
