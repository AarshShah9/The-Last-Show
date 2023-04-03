import React from "react";
import { useState } from "react";
import "./AbituaryCard.css";

function AbituaryCard({ imageSrc, audioSrc, name, born, died, bio }) {
  const [cardOpen, setCardOpen] = useState(false);
  return (
    <div className="card">
      <img className="card-image" src={imageSrc} />
      <p className="card-name">{name}</p>
      <p className="date">
        {born} - {died}
      </p>
      {/* update below to have transition */}
      {/* <p>{cardOpen ? bio : null}</p>
      <audio controls>
        <source src={audioSrc} type="audio/mpeg" />
      </audio> */}
    </div>
  );
}

export default AbituaryCard;
