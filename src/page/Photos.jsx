import React, { Component } from "react";
import { styles } from "../style/styles";
import axios from "axios";
import ModalImage from "react-modal-image";
import { Button } from "@material-ui/core";

class Photo extends Component {
  state = {
    photo: [],
    hidden: [],
  };

  // получаем фото по id альбома
  componentDidMount() {
    axios
      .get(`http://localhost:3001/photos?albumId=${this.props.match.params.id}`)
      .then((res) => {
        this.setState({
          photo: res.data,
        });
      });
  }

  render() {
    const { photo, hidden } = this.state;

    return (
      <div style={styles.PhotoCard}>
        <Button
          onClick={() => {
            this.setState({ hidden: photo.map((photo) => photo.id) });
          }}
        >
          Скрыть все
        </Button>
        <div style={styles.AllCards}>
          {photo.map((photo) => {
            if (!hidden.includes(photo.id))
              return (
                <div style={styles.ModalImage}>
                  <ModalImage
                    small={photo.thumbnailUrl}
                    large={photo.url}
                    alt="пикча"
                  />
                  <Button
                    onClick={() => {
                      this.setState({ hidden: [...hidden, photo.id] });
                    }}
                  >
                    Скрыть
                  </Button>
                </div>
              );
          })}
        </div>
      </div>
    );
  }
}

export default Photo;
