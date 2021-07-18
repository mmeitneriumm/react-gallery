// рефакторинг бы не помешал хехех

import React, { Component } from "react";
import {NavLink} from 'react-router-dom';
import { Button, Card } from "antd";
import axios from "axios";

class Album extends Component {
  state = {
    album: [],
    photoData: [],
    hidden: []
  };

  // вытаскиваем последнее фото альбома и количество
  async getLastPhoto(id) {
    var res = await axios.get(
      "https://jsonplaceholder.typicode.com/photos?albumId=" +
        id +
        "&_sort=id&_order=desc&_limit=1"
    );
    return [res.data[0].thumbnailUrl, res.headers["x-total-count"]];
  }

  // берем данные, дожидаясь прихода всех
  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/albums").then((res) => {
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
    const albumData = this.state.album;
    const photoData = this.state.photoData;
    const hidden = this.state.hidden;

    return (
      <>
        {albumData.map((albumItem) => {
          if (!hidden.includes(albumItem.id)) return (
            <Card
              value={albumItem.id}
              hoverable
              bodyStyle={{ padding: 0 }}
              style={{
                display: "flex",
                justifyContent: "center",
                width: 300,
              }}
              cover={
                <>
                <NavLink to={'/photos/' + albumItem.id}>
                  <img
                    alt={albumItem.id}
                    src={
                      photoData.length > 0 ? photoData[albumItem.id - 1][0] : ""
                    }
                    style={{
                      width: 300,
                      display: "flex",
                      justifyContent: "center"
                    }}
                  />
                  <p style={{ textAlign: "center", fontWeight: "bold", color: 'black' }}>
                    {albumItem.title}
                  </p>
                  <p style={{ textAlign: "center" }}>
                    Количество:{" "}
                    {photoData.length > 0 ? photoData[albumItem.id - 1][1] : ""}
                  </p>
                  </NavLink> 
                  <Button onClick={()=>{this.setState({hidden: [...hidden,albumItem.id]})}}>Скрыть</Button>
                  </>  
              }
            ></Card>
          );
        })}
      </>
    );
  }
}

export default Album;
