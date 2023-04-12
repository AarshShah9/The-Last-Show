import React from "react";
import { useState, useEffect } from "react";
import "./AbituaryCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

function AbituaryCard({ imageId, audioId, name, born, died, bio }) {
  const [cardOpen, setCardOpen] = useState(false);
  const CLOUDNAME = "duoghyw7n";
  const [audio] = useState(new Audio(`https://res.cloudinary.com/${CLOUDNAME}/video/upload/${audioId}`));
  const [playing, setPlaying] = useState(false);

  const wordsArray = name.split(" ");
  // const firstName = wordsArray[0][0].toUpperCase() + wordsArray[0].slice(1);
  // const lastName = wordsArray[1][0].toUpperCase() + wordsArray[1].slice(1);
  // const firstName = "";

  const convertDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  const togglePlay = () => setPlaying(!playing);

  const toggleCard = () => {
    setCardOpen(!cardOpen);
  };

  useEffect(() => {
    if (playing) {
      setPlaying(!playing);
      audio.load();
    }
  }, [cardOpen]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return (
      <div className="card" onClick={toggleCard}>
        <img
          className="card-image"
          src={`https://res.cloudinary.com/${CLOUDNAME}/image/upload/e_art:zorro/${imageId}`}
          alt={name + " image"}
        />
        {/* <p className="card-name">{firstName + " " + lastName}</p> */}
        <p className="card-name">{name}</p>
        <p className="date">
          {convertDate(born)} - {convertDate(died)}
        </p>

        {/* update below to have transition */}
        <div className={cardOpen ? "body active" : "body"}>
          <p className="bio">{bio}</p>
          {/* <audio controls>
            <source src={audioSrc} type="audio/mpeg" />
          </audio> */}
          <div className="audio-button-wrapper">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="audio-button"
            >
              <FontAwesomeIcon
                icon={!playing ? faPlay : faPause}
                className="font-awesome-icon"
              />
            </button>
          </div>
        </div>
      </div>
  );
}

export default AbituaryCard;
