import React, { Component } from "react";
import DeleteModal from "../components/DeleteModal";
import { styles } from "../style/styles";
import { NavLink } from "react-router-dom";
import { Button, Card } from "antd";
import axios from "axios";

class Album extends Component {
  state = {
    album: [],
    photoData: [],
    hidden: [],
  };

  // вытаскиваем последнее фото альбома и количество
  async getLastPhoto(id) {
    var res = await axios.get(
      "http://localhost:3001/photos?albumId=" +
        id +
        "&_sort=id&_order=desc&_limit=1"
    );
    if (res.headers["x-total-count"] == 0) {
      return ["http://localhost:3001/nophoto.jpg", 0];
    }
    return [res.data[0].thumbnailUrl, res.headers["x-total-count"]];
  }

  // берем данные, дожидаясь прихода всех
  componentDidMount() {
    axios.get("http://localhost:3001/albums").then((res) => {
      this.setState({
        album: res.data,
      });
      res = Promise.all(
        res.data.map((data) =>
          this.getLastPhoto(data.id).then((photo) => photo)
        )
      );
      res.then((data) => this.setState({ photoData: data }));
    });
  }

  render() {
    const { album: albumData, photoData, hidden } = this.state;

    return (
      <>
        {albumData
          .map((albumItem, index) => {
            if (!hidden.includes(albumItem.id))
              return (
                <Card
                  value={albumItem.id}
                  hoverable
                  bodyStyle={{ padding: 0 }}
                  style={styles.Card}
                  cover={
                    <>
                      <NavLink to={"/photos/" + albumItem.id}>
                        <img
                          alt={albumItem.id}
                          src={photoData.length > 0 ? photoData[index][0] : ""}
                          style={styles.Img}
                        />
                        <p style={styles.CardTitle}>{albumItem.title}</p>
                        <p style={styles.CountText}>
                          Количество:{" "}
                          {photoData.length > 0 ? photoData[index][1] : ""}
                        </p>
                      </NavLink>
                      <div style={styles.Buttons}>
                        <Button
                          onClick={() => {
                            this.setState({
                              hidden: [...hidden, albumItem.id],
                            });
                          }}
                        >
                          Скрыть
                        </Button>
                        <Button>Изменить</Button>
                        <DeleteModal id={albumItem.id} type={"albums"} />
                      </div>
                    </>
                  }
                ></Card>
              );
          })
          .reverse()}
      </>
    );
  }
}

export default Album;
