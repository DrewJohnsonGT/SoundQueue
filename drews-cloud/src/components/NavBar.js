import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { Context } from '../Context';
import { COLORS } from '../lib/constants';

const NAV_OPTIONS = [
    { id: 'likes', label: 'Likes' },
    { id: 'queue', label: 'Queue' }
];

const Root = styled.div`
    display: flex;
    position: relative;
    background-color: ${COLORS.orange};
    bottom: 0;
    padding: 0.2rem;
    z-index: 10;
`;

const Option = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    color: white;
    ${({ selected }) =>
        selected &&
        css`
            background-color: ${COLORS.darkOrange};
        `}
`;
const NavBar = () => {
    const {
        state: { page },
        dispatch
    } = useContext(Context);
    return (
        <Root>
            {NAV_OPTIONS.map(({ id, label }) => (
                <Option
                    key={id}
                    selected={page === id}
                    onClick={() =>
                        dispatch({
                            type: 'CHANGE_PAGE',
                            payload: id
                        })
                    }
                >
                    {label}
                </Option>
            ))}
        </Root>
    );
};

export default NavBar;
