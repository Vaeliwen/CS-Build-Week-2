import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Player from './components/player.js'
import MoveButton from './components/move-button';

function App() {
  const [player, setPlayer] = useState({})
  const [location, setLocation] = useState({})
  const [map, setMap] = useState(JSON.parse(localStorage.getItem("map")))
  let config = {
    'Content-Type': 'Application/JSON'
  };

  axios.interceptors.request.use(
    options => {
      options.headers.authorization = `Token 012d6dc740a0af2c6321ccf5c2754d1eba3ba1bc`
    return options},
    error => {return Promise.reject(error)}
  )

  useEffect(() => {
    axios
      .get('https://lambda-treasure-hunt.herokuapp.com/api/adv/init/', {headers: config})
      .then(res => {setLocation(res.data)})
      .catch(err => console.log(err))       

  }, [])

  useEffect(() => {
    axios
      .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/status/', {headers: config})
      .then(res => {setPlayer(res.data)})
      .catch(err => console.log(err))       
  }, [])

  return (
    <div>
      <Player player={player} location={location} />
      <MoveButton direction="North" trigger="n" />
      <MoveButton direction="South" trigger="s" />
      <MoveButton direction="East" trigger="e" />
      <MoveButton direction="West" trigger="w" />

    </div>
  )
}

export default App;
