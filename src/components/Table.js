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
              imageId={obituary.imageId}
              audioId={obituary.audioId}
              name={obituary.name}
              born={obituary.born}
              died={obituary.died}
              bio={obituary.bio}
            />
          );
        })}
        <AbituaryCard
          className="card"
          // imageSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg"
          imageId="ci2bgkm0om5ox99kekl7"
          audioId="lbel0m2ouusgqtqya4l5"
          name="Aarsh"
          born="November 9, 2003"
          died="Present"
          bio="Lorem ipsum dolor sit amet. Et galisum provident et voluptas nisi aut perferendis reprehenderit. 
Ut delectus exercitationem ex reiciendis sapiente aut temporibus inventore."
        />
        <AbituaryCard
          className="card"
          imageId="ci2bgkm0om5ox99kekl7"
          audioId="lbel0m2ouusgqtqya4l5"
          name="Aarsh"
          born="November 9, 2003"
          died="Present"
          bio="Lorem ipsum dolor sit amet. Et galisum provident et voluptas nisi aut perferendis reprehenderit. 
Ut delectus exercitationem ex reiciendis sapiente aut temporibus inventore. 
Et perferendis assumenda ex reprehenderit rerum id voluptatem quisquam."
        />
      </div>
    </div>
  );
}

export default Table;
