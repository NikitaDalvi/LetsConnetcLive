/*jshint esversion:9*/
import React, { useState } from "react";
//import MenuBar from "./MenuBar";
import MusicCard from "./MusicCard-component";
import { db } from "./db-component";

function Player(){
  const [current,setCurrent] = useState(1);
  
  const next = action => {
    let Current = current;
    if (action === "next") {
      if (Current === db.alternative.length) setCurrent(1);
      else {
        setCurrent(prevValue => prevValue + 1);
      }
    } else {
      if (Current === 1) {
        setCurrent(db.alternative.length);
      } else {
        setCurrent(prevValue => prevValue - 1);
      }
    }
  };
  const play = () => {
    document.getElementById("video").src += "?autoplay=1";
  };

    return (
      <div className="App">
        <MusicCard
          data={db.alternative[current - 1]}
          next={next}
          play={play}
        />
        ;
      </div>
    );
}

export default Player;
