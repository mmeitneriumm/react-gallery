import React, { Component } from "react";
import { styles } from "../style/styles";
import DeleteModal from "../components/DeleteModal";
import AddPhoto from "../components/AddPhoto";
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
      <div style={styles.Main}>
        <div style={styles.Buttons}>
          <Button
            style={styles.Button}
            size={"large"}
            onClick={() => {
              this.setState({ hidden: photo.map((photo) => photo.id) });
            }}
          >
            Скрыть все
          </Button>
          <AddPhoto albumId={this.props.match.params.id} />
        </div>
        <div style={styles.PhotoCard}>
          <div style={styles.AllCards}>
            {photo
              .map((photo) => {
                if (!hidden.includes(photo.id))
                  return (
                    <div style={styles.ModalImage}>
                      <ModalImage
                        small={photo.thumbnailUrl}
                        large={photo.url}
                        alt="пикча"
                      />
                      <p style={styles.CardTitle}>{photo.title}</p>
                      <div style={styles.Buttons}>
                        <Button
                          onClick={() => {
                            this.setState({ hidden: [...hidden, photo.id] });
                          }}
                        >
                          Скрыть
                        </Button>
                        <DeleteModal id={photo.id} type={"photos"} />
                        <Button>Изменить</Button>
                      </div>
                    </div>
                  );
              })
              .reverse()}
          </div>
        </div>
      </div>
    );
  }
}

export default Photo;
