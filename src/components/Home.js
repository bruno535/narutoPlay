import React, { useState } from 'react';
import { listEpisodes } from '../services/listEpisodes.js'
import Description from './Description.js'

import './Home.css'

const Home = () => {
    const [showDescription, setShowDescription] = useState(false)
    const [selectedEpisodeId, setSelectedEpisodeId] = useState(0)
    const [showFillers, setShowFillers] = useState(true)
    const episodesWithoutFillers = listEpisodes.filter(episode => !episode.filler)

    const handleEpisodeClick = (episodeId) => {
        setShowDescription(true);
        setSelectedEpisodeId(episodeId)
    }

    const renderEpisodeList = (episodes) => (
        episodes.map((episode) => (
            <li key={episode.id} onClick={() => handleEpisodeClick(episode.id)}>
                <h3>{episode.id}- {episode.nomePortugues} </h3>{episode.filler && <span>Filler</span>}
            </li>
        ))
    )

    return (
        <div id='banner'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Naruto_logo.svg/2560px-Naruto_logo.svg.png' alt='logo' />

            <div>
                <button onClick={() => setShowFillers(true)}>Com Fillers</button>
                <button onClick={() => setShowFillers(false)}>Sem Fillers</button>
            </div>

            <ul>
                {showFillers ? renderEpisodeList(listEpisodes) : renderEpisodeList(episodesWithoutFillers)}
            </ul>

            {showDescription && <Description episodeId={selectedEpisodeId - 1} />}
        </div>
    );
};

export default Home;
