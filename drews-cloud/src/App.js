import React, { useEffect, useState } from 'react';
import { getLikes } from './lib/helpers';
import { CLIENT_ID, USER_ID } from './lib/constants';

const App = () => {
    const [likes, setLikes] = useState([]);
    useEffect(() => {
        setLikes(
            getLikes({
                userId: USER_ID,
                clientId: CLIENT_ID,
                offset: 0,
                limit: 50
            })
        );
    }, []);
    console.log(likes);
    return <div />;
};

export default App;
