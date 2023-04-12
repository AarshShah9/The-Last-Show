import React from "react";
import AbituaryCard from "../components/AbituaryCard";
import "./Table.css";
import Masonry from 'react-masonry-css'


function Table({ obituaries }) {

  const breakpointColumnsObj = {
    default: 4,
    1150: 2,
    700: 1
  };
  
  return (
    <div className="table-wrapper">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
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
      </Masonry>
    </div>
  );
}

export default Table;
