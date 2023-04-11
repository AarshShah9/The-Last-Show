import { React, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Overlay from "./components/Overlay";
import Table from "./components/Table";
import "./App.css";

function App() {
  let CREATE_OBITUARY_URL = "https://za57fl2wiqv7mz725dacgumdaa0ntuvd.lambda-url.ca-central-1.on.aws/";
  let GET_OBITUARIES_URL = "https://bwgfqjwhsn2gw7czfqfkxfzx2u0hfgoj.lambda-url.ca-central-1.on.aws/";

  const [overlay, setOverlay] = useState(false);
  const [obituaries, setObituaries] = useState([]);

  const toggleObituaryOverlay = () => {
    setOverlay(!overlay);
  };

  const getObituaries = () => {
    fetch(GET_OBITUARIES_URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let obitArr = [];
        for (let i = 0; i < data.length; i++) {
          const obituary = {
            id: data[i].id,
            name: data[i].name,
            born: data[i].born,
            died: data[i].died,
            bio: data[i].obituary,
            audioID: data[i].audio,
            imageID: data[i].image,
          }
          obitArr.push(obituary);
        }
        setObituaries(obitArr);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  //gets obituaries on page load
  useEffect(() => {
    getObituaries();
  }, []);

  const addObituary = (obituary) => {
    // const formData = new FormData();
    // formData.append("id", obituary.id);
    // formData.append("file", obituary.file);
    // formData.append("name", obituary.name);
    // formData.append("born", obituary.born);
    // formData.append("died", obituary.died);
    const data = {
      id: obituary.id,
      file: obituary.file,
      name: obituary.name,
      born: obituary.born,
      died: obituary.died,
    }

    fetch(CREATE_OBITUARY_URL, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          getObituaries();
          toggleObituaryOverlay();
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        toggleObituaryOverlay();
      });
  };

  return (
    <div className="container">
      <div className={!overlay ? "box" : "box box-disabled"}>
        <Navbar toggleObituaryOverlay={toggleObituaryOverlay} />
        <Table obituaries={obituaries} />
      </div>
      <div className="box overlay">
        {overlay ? (
          <Overlay
            addObituary={addObituary}
            toggleObituaryOverlay={toggleObituaryOverlay}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
