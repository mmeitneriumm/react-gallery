import React, { Component } from "react";
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
      .get(
        `https://jsonplaceholder.typicode.com/photos?albumId=${this.props.match.params.id}`
      )
      .then((res) => {
        this.setState({
          photo: res.data,
        });
      });
  }

  render() {
    const photo = this.state.photo;
    const hidden = this.state.hidden;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Button
          onClick={() => {
            this.setState({ hidden: photo.map((photo) => photo.id) });
          }}
        >
          Скрыть все
        </Button>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
            gap: 40,
            justifyItems: "center",
          }}
        >
          {photo.map((photo) => {
            if (!hidden.includes(photo.id))
              return (
                <div style={{ display: "flex", flexDirection: "column" }}>
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
