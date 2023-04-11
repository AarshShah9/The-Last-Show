import React from "react";
import { useState } from "react";
import "./AbituaryCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

function AbituaryCard({ imageId, audioId, name, born, died, bio }) {
  const [cardOpen, setCardOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const CLOUDNAME = "duoghyw7n";
  const words = name;
  const wordsArray = words.split(" ");
  const firstName = wordsArray[0][0].toUpperCase() + wordsArray[0].slice(1);
  const lastName = wordsArray[1][0].toUpperCase() + wordsArray[1].slice(1);

  const convertDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  let audio = new Audio(
    `https://res.cloudinary.com/${CLOUDNAME}/video/upload/${audioId}`
  );

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
        <img
          className="card-image"
          src={`https://res.cloudinary.com/${CLOUDNAME}/image/upload/${imageId}`}
          alt={name + " image"}
        />
        <p className="card-name">{firstName + " " + lastName}</p>
        <p className="date">
          {convertDate(born)} - {convertDate(died)}
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
            >
              <FontAwesomeIcon
                icon={!isPlaying ? faPlay : faPause}
                className="font-awesome-icon"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AbituaryCard;
