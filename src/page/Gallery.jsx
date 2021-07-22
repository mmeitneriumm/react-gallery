import React, { Component } from "react";
import { styles } from "../style/styles";
import Album from "./Albums";
import CreateAlbum from "../components/CreateAlbum";

class Gallery extends Component {
  render() {
    return (
      <div style={styles.Main} id="gallery">
        <div style={styles.TextAndButton}>
          <span style={styles.GalleryText}>gallery:</span>
          <CreateAlbum />
        </div>
        <div style={styles.GalleryMain}>
          <div style={styles.GalleryList}>
            <Album />
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
