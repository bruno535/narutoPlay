import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listEpisodes } from '../services/listEpisodes';
import './Description.css';

const Description = ({ episodeId }) => {
    const [animationState, setAnimationState] = useState('open');
    const [leftStyle, setLeftStyle] = useState('0');

    useEffect(() => {
        setAnimationState('open');
        setLeftStyle('0');
    }, [episodeId]);

    const formatEpisodeNumber = (episodeNumber) => {
        const formattedEpisodeNumber = episodeNumber < 10 ? '0' + episodeNumber : episodeNumber;
        return formattedEpisodeNumber;
    };
    
    const handleClick = () => {
        setAnimationState('close');
        setLeftStyle('-110%');
    }

    return (
        <div id='description' className={`${animationState}`} style={{ left: leftStyle }}>
            <div>
                <h2>
                    {listEpisodes[episodeId].nomePortugues}
                    {listEpisodes[episodeId].filler && <span>Filler</span>}
                </h2>

                <span>{listEpisodes[episodeId].dataLancamento}</span>
                
                <p>{listEpisodes[episodeId].descricao}</p>
                
                <button>
                    <Link to={`episodes/${formatEpisodeNumber(episodeId + 1)}`}>Assistir</Link>
                </button>
                
                <button onClick={handleClick}>Sair</button>
            </div>
        </div>
    );
};

export default Description;
