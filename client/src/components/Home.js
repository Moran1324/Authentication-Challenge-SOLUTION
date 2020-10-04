import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { Logged, Timer } from '../components/login/useContextComp';

function Home({ count }) {

    let value = useContext(Logged)
    let timer = useContext(Timer);
    const logOut = () => {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('name')
        Cookies.remove('isAdmin')
        value.setIsLogged(false)
        timer.setTimer(null)
    }

    return (
        <div className='Home' >
            <span>home page<Button variant="danger" onClick={logOut} >Log Out</Button></span><br />
            <Button variant="danger">try to get information from server</Button>
            {count}
        </div>

    );
}

export default Home;
