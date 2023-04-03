import React from "react";
import Navbar from "./components/Navbar";
import Overlay from "./components/Overlay";
import Table from "./components/Table";
import AbituaryCard from "./components/AbituaryCard";

function App() {
  return (
    <>
      <Navbar />
      {/* <Table /> */}
      <AbituaryCard
        // imageSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg"
        imageSrc="https://media.cnn.com/api/v1/images/stellar/prod/200126210422-27-kobe-bryant-gallery-restricted.jpg?q=w_2500,h_1488,x_0,y_0,c_fill/w_1376"
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        name="Aarsh"
        born="November 9, 2003"
        died="Present"
        bio="Lived a great life"
      />
      {/* <Overlay /> */}
    </>
  );
}

export default App;
