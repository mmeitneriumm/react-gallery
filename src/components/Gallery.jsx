import React, { Component } from "react";
import Album from "./Albums";

class Gallery extends Component {

  render() {
    return (
      <>
        <h1
          style={{
            textAlign: "center",
            fontSize: 50,
            backgroundColor: "#EEF0F4",
            margin: 0,
            paddingBottom: 40,
            fontWeight:'bold'
          }}
        >
          gallery
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#EEF0F4",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: 40,
            }}
          >
            <Album /> 
          </div>
        </div>
      </>
    );
  }
}

export default Gallery;
