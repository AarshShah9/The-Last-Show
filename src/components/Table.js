import React from "react";
import AbituaryCard from "../components/AbituaryCard";
import "./Table.css";

function Table({ obituaries }) {
  return (
    <div className="table-wrapper">
      <div className="table">
        {obituaries.map((obituary) => {
          return (
            <AbituaryCard
              className="card"
              key={obituary.id}
              imageId={obituary.imageID}
              audioId={obituary.audioID}
              name={obituary.name}
              born={obituary.born}
              died={obituary.died}
              bio={obituary.bio}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Table;
