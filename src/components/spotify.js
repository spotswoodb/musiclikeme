import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';



function Spotify() {

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const REDIRECT_URI = 'http://localhost:3000'
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
  const RESPONSE_TYPE = 'token'
  const SCOPES = [
    "user-top-read"
  ]

  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [artists,setArtists] = useState([])
  const [shows, setShows] = useState([])
  const [tracks, setTracks] = useState([])

  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: 'artist'
      }
    })
    // console.log(data.artists.items)
    setArtists(data.artists.items)
    

  }

  const searchShows = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: 'show'
      }
    })
    // console.log(data.shows)
    setShows(data.shows.items)   

  }

  const getTracks = async () => {
    const {data} = await axios.get("https://api.spotify.com/v1/tracks", {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    
    console.log(data)

  }

  const getTopTracks = async () => {
    const {data} = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params: {
            time_range: 'long term_term'
        }
    })

    // console.log(data.items)
    setTracks(data.items)
  }


  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
          {artist.images.length ? <img width={"50%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
          {artist.name}
      </div>
    ))
  }

  const renderShows = () => {
    return shows.map(show => (
      <div key={show.id}>
          {show.images.length ? <img width={"50%"} src={show.images[0].url} alt=""/> : <div>No image</div>}
          {show.name}
      </div>
    ))
  }

  const renderTopTracks = () => {

    return tracks.map(track => (
        <div key={track.id}>
            <li>
                {track.album.images.length ? <img width={"50%"} src={track.album.images[0].url} alt=""/> : <div>No image</div>}
                {track.name}
            </li>
        </div>
    ))
  }

  return (
    
    <div className="home">
      <header className="App-header">
        <h1>Music Like Me</h1>
        

        <h2>Search Artists</h2>


        {token ?
          <form onSubmit={searchArtists}>
            <input type="text" onChange={e => setSearchKey(e.target.value)}/>
            <button type={"submit"}>Search</button>
          </form>
        
          : <h2>Please Login</h2>
        }

        <h2>Search Podcasts</h2>

        {token ?
          <form onSubmit={searchShows}>
            <input type="text" onChange={e => setSearchKey(e.target.value)}/>
            <button type={"submit"}>Search</button>
          </form>
        
          : <h2>Please Login</h2>
        }

        <h2>Top Tracks on Spotify:</h2>


        {token ? <button onClick={getTracks} type={'submit'}>Click Me</button>
        : <h2>Please Login</h2>
        }

        <h2>Your Top Tracks *figure out time range:</h2>

        {token ? <button onClick={getTopTracks} type={'submit'}>Click Me</button>
          : <h2>Please Login</h2>
        }

        {renderArtists()}
        {renderShows()}
        <ol>
            {renderTopTracks()}
        </ol>

        
        

      </header>
    </div>
  );
}

export default Spotify;
