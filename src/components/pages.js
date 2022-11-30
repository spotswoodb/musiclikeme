import React from 'react';
import Spotify from './spotify';
import Home from './home';
import { Routes, Route } from 'react-router-dom';

export default function Pages() {
    return (
       <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/spotify' element={<Spotify />} />
       </Routes>
    )
}
