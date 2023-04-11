import React from "react";
import { useState } from "react";
import "./AbituaryCard.css";

function AbituaryCard({ imageSrc, audioSrc, name, born, died, bio }) {
  const [cardOpen, setCardOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  let audio = new Audio(audioSrc);

  const handlePlay = () => {
    if (!isPlaying) {
      audio.play();
      setIsPlaying(true);
      console.log("Started playing");
    } else {
      audio.pause();
      setIsPlaying(false);
      console.log("Pause");
    }
  };
  const toggleCard = () => {
    setCardOpen(!cardOpen);
  };

  return (
    <div className="card-wrapper">
      <div className="card" onClick={toggleCard}>
        <img className="card-image" src={imageSrc} alt={name + " image"} />
        <p className="card-name">{name}</p>
        <p className="date">
          {born} - {died}
        </p>

        {/* update below to have transition */}
        <div className={cardOpen ? "card-open" : "card-closed"}>
          <p className="bio">{bio}</p>
          {/* <audio controls>
            <source src={audioSrc} type="audio/mpeg" />
          </audio> */}
          <div className="audio-button-wrapper">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlay();
              }}
              className="audio-button"
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AbituaryCard;
