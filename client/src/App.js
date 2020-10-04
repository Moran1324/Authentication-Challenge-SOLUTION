import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Logged, Timer } from './components/login/useContextComp';
import Login from './components/login/login';
import Registaer from './components/registaer/registaer';
import { create } from './components/Network/Ajax';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';

function App() {

  const [isLogged, setIsLogged] = useState(false)
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [timer, setTimer] = useState(0)


  const getAccessToken = () => {
    create('/users/token', {token: Cookies.get('refreshToken')})
      .then(res => {
        Cookies.set('accessToken', res.accessToken)
        console.log('access refresg');
        setCount(count + 1)
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    if (Cookies.get('accessToken')) {
      create('/users/tokenValidate')
        .then(res => {
          setIsLogged(res.valid);
          setTimer(setInterval(() => getAccessToken(), 29000))
          setLoading(false);
        })
        .catch(err => { setLoading(false); setIsLogged(false); console.error(err); })
    } else {
      setLoading(false)
      setIsLogged(false)
    }
    return () => setTimer(null)
  }, [])


  return (
    <Router>
      {!loading ?
        !isLogged ?
          <Logged.Provider value={{ isLogged, setIsLogged }}>
            <Timer.Provider value={{ count, setCount, timer, setTimer, getAccessToken }}>
              <Switch>
                <Route path="/register">
                  <Registaer />
                </Route>
                <Route path="/">
                  <Login />
                </Route>
              </Switch>
            </Timer.Provider>
          </Logged.Provider>
          :
          <Logged.Provider value={{ isLogged, setIsLogged }}>
            <Timer.Provider value={{ count, setCount, timer, setTimer, getAccessToken }}>
              <Switch>
                <Route path="/">
                  <Home count={count} />
                </Route>
              </Switch>
            </Timer.Provider>
          </Logged.Provider>
        :
        <div></div>
      }
    </Router>
  );
}

export default App;
