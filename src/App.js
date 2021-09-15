import React, {useEffect, useState} from 'react';
import './App.css';
import SpotifyWebApi from "spotify-web-api-js";
import {getTokenFromResponse} from './spotify'
import Login from './Components/Login/Login';
import {useStateValue} from './StateProvider';
import Player from './Components/Player/Player'

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useStateValue();
  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash="";
   let _token = hash.access_token;
   console.log("Token", _token);
   if(_token){
    dispatch({
      type: "SET_TOKEN",
      token: _token,
    });

     spotify.setAccessToken(_token);
     
    spotify.getMe().then((user) => {
      dispatch({
        type: "SET_USER",
        user,
      });
    });
    spotify.getUserPlaylists().then(playlists=>{
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        })
    });
    spotify.getPlaylist("0vlv4o2JqFbavPSs8BqvUd").then((response) =>
    dispatch({
      type: "SET_DISCOVER_WEEKLY",
      discover_weekly: response,
    })
  );

  spotify.getMyTopArtists().then((response) =>
    dispatch({
      type: "SET_TOP_ARTISTS",
      top_artists: response,
    })
  );

  dispatch({
    type: "SET_SPOTIFY",
    spotify: spotify,
  });


   }

  }, [token, dispatch]);

  return (
    <div className="App">
      {
        token ? (
          <Player spotify={spotify}/>
        ):
        ( 
        <Login />
         )
      }
       
    </div>
  );
}

export default App;
