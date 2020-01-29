import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Layout = ({ children }) => <Root>{children}</Root>;

export default Layout;
