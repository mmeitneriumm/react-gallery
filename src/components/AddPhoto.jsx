import React, { Component } from "react";
import { styles, modalStyle } from "../style/styles";
import { Button } from "antd";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

class AddPhoto extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalIsOpen: false,
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleCreate(e) {
    e.preventDefault();
    console.log(e.target[1].files[0]);
    const formData = new FormData();
    formData.append("title", e.target[0].value);
    formData.append("image", e.target[1].files[0]);
    formData.append("albumId", this.props.albumId);
    axios.post("http://localhost:3001/photos", formData).then(() => {
      this.closeModal();
      window.location.reload();
    });
  }

  render() {
    return (
      <>
        <Button
          style={styles.Button}
          size={"large"}
          onClick={() => {
            this.openModal();
          }}
        >
          Добавить фото
        </Button>
        <Modal
          style={modalStyle}
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => {
            this.closeModal();
          }}
          contentLabel="Modal #2 Global Style Override Example"
        >
          <div style={styles.ModalForm}>
            <h2 style={styles.ModalMainText}>Добавить фото</h2>
            <Button
              onClick={() => {
                this.closeModal();
              }}
            >
              X
            </Button>
          </div>
          <div style={styles.InputForm}>
            <form
              onSubmit={this.handleCreate.bind(this)}
              id="getFileForm"
              enctype="multipart/form-data"
            >
              <input type="text" name="title" />
              <input type="file" name="image" />
              <input type="submit" />
            </form>
          </div>
        </Modal>
      </>
    );
  }
}

export default AddPhoto;
