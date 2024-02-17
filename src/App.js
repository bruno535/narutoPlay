import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EpisodeDetail from './components/EpisodeDetail.js';
import Home from './components/Home.js';

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/episodes/:episodeNumber' element={<EpisodeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;