import "../../styles/globals.css";
import "../../styles/Navbar.css";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faUserTie } from '@fortawesome/free-solid-svg-icons';
import AudioPlayer from 'react-audio-player';
import React, { useRef } from 'react';


function Navbar() {
  const audioPlayer = useRef<AudioPlayer>(null);

  const playSound = () => {
    if (audioPlayer.current) {
      audioPlayer.current.audioEl.current?.play();
    }
  };

  return (
    <nav className="navbar">
     <Link href="/">
        <h1 data-tip="Play Sound" data-event="click" onMouseOver={playSound}>
          YourCoin
        </h1>
      </Link>
      {/* <AudioPlayer
        ref={audioPlayer}
        src="../../sounds/sound.mp3"
        autoPlay={false}
        controls={false}
        loop={false}
        volume={1.0}
      /> */}
      <div className="ml-auto">
        <Link href="/basket">
          <FontAwesomeIcon icon={faShoppingCart} className="mr-4" />
        </Link>
        <Link href="/login">
          <FontAwesomeIcon icon={faUserTie} className="mr-4" />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar;