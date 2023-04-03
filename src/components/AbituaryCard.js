import React from "react";
import { useState } from "react";
import "./AbituaryCard.css";

function AbituaryCard({ imageSrc, audioSrc, name, born, died, bio }) {
  const [cardOpen, setCardOpen] = useState(false);

  const toggleCard = () => {
    setCardOpen(!cardOpen);
  };

  return (
    <div className="card" onClick={toggleCard}>
      <img className="card-image" src={imageSrc} />
      <p className="card-name">{name}</p>
      <p className="date">
        {born} - {died}
      </p>
      {/* update below to have transition */}
      <p className="bio">{cardOpen ? bio : null}</p>
      {cardOpen ? (
        <audio controls>
          <source src={audioSrc} type="audio/mpeg" />
        </audio>
      ) : null}
    </div>
  );
}

export default AbituaryCard;
