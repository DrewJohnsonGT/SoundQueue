import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../Context';
import { getLikes } from '../lib/helpers';
import NavBar from './NavBar';

const SCROLL_THRESHOLD = 5;

const Root = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    position: absolute;
`;

const Content = styled.div`
    overflow: auto;
    flex: 1;
`;
const Layout = ({ children }) => {
    const {
        state: { nextLikesGetEndpoint },
        dispatch
    } = useContext(Context);
    return (
        <Root>
            <Content
                onScroll={({
                    target: { scrollHeight, scrollTop, clientHeight }
                }) => {
                    if (
                        scrollHeight -
                            (scrollTop +
                                scrollTop * (SCROLL_THRESHOLD / 100)) <=
                        clientHeight
                    ) {
                        getLikes({ nextLikesGetEndpoint }).then(likes =>
                            dispatch({
                                type: 'LIKES_LOADED',
                                payload: likes
                            })
                        );
                    }
                }}
            >
                {children}
            </Content>
            <NavBar />
        </Root>
    );
};

export default Layout;
