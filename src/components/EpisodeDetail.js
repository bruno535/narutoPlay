import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause, FaArrowLeft, FaAngleLeft, FaAngleRight, FaVolumeMute, FaVolumeDown } from "react-icons/fa";
import { BiFullscreen, BiExitFullscreen } from "react-icons/bi";
import { listEpisodes } from '../services/listEpisodes.js';

import './EpisodeDetail.css';

const EpisodeDetail = () => {
  const { episodeNumber } = useParams();
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);
  const [fullscreen, setFullscreen] = useState(false)
  const [volume, setVolume] = useState(0.01);
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    setProgress(0);
  }, [episodeNumber]);

  const toggleFullScreen = () => {
    const element = document.documentElement;
    if (!document.fullscreenElement &&
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  const getNextEpisodeNumber = (episodeNumber) => {
    const episode = Number(episodeNumber);
    const next = episode < 220 ? episode + 1 : 220;
    return next < 10 ? '0' + next : next;
  };

  const getPreviousEpisodeNumber = (episodeNumber) => {
    const episode = Number(episodeNumber);
    const previous = episode > 1 ? episode - 1 : 1;
    return previous < 10 ? '0' + previous : previous;
  };

  useEffect(() => {
    let timer;

    const hideControls = () => {
      timer = setTimeout(() => {
        setShowControls(false);
      }, 1000);
    };

    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timer);
      hideControls();
    };

    const handleMouseLeave = () => {
      setShowControls(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  const handleProgressChange = (e) => {
    const value = parseFloat(e.target.value);
    const fraction = value / duration;
    const during = videoRef.current.getDuration();
    const seekTime = during * fraction;
    setProgress(value);
    videoRef.current.seekTo(seekTime);
  };

  const handleProgress = (state) => {
    const { playedSeconds } = state;
    setProgress(playedSeconds);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  return (
    <div id="player">
      {showControls && (
        <>
          <div id='barName'>
            <div>
              <Link to='../' className='buttons'><FaArrowLeft /></Link>
              <p>{listEpisodes[Number(episodeNumber)].nomePortugues}</p>
            </div>
            {window.innerWidth > 1000 &&
              <button
                className='buttons'
                onClick={toggleFullScreen}
              >
                <p onClick={() => setFullscreen(!fullscreen)}>
                  {fullscreen ? <BiFullscreen className='buttons'/> : <BiExitFullscreen className='buttons'/>}
                </p>
              </button>
            }
          </div>

          <div id='barPlay'>
            <Link to={`../episodes/${getPreviousEpisodeNumber(episodeNumber)}`} className='buttons'><FaAngleLeft /></Link>
            
            {isPlaying
              ? <FaPause className='buttons' onClick={() => setIsPlaying(false)} />
              : <FaPlay className='buttons' onClick={() => setIsPlaying(true)} />
            }
            <Link to={`../episodes/${getNextEpisodeNumber(episodeNumber)}`} className='buttons'><FaAngleRight /></Link>
          </div>

          <div id='barProgress'>
            <input className='progress' type='range' min='0' step="1" max={duration} value={progress} onChange={handleProgressChange} />
            
            <div>
              <input className='volumeProgress' type='range' min='0' max='0.1' step='0.01' value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} />
              <button className='buttons' onClick={() => setMuted(!muted)}>{muted ? <FaVolumeMute /> : <FaVolumeDown />}</button>
            </div>
          </div>
        </>
      )}
      <ReactPlayer
        ref={videoRef}
        url={`/naruto12/NARUTO_${episodeNumber}.mkv`}
        controls={false}
        playing={isPlaying}
        width='100vw'
        height='100vh'
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
    </div>
  );
};

export default EpisodeDetail;
