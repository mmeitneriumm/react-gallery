import React, { Component } from "react";
import { styles, modalStyle } from "../style/styles";
import { Button } from "antd";
import Modal from "react-modal";
import axios from "axios";

// Modal.setAppElement("#gallery");

class CreateAlbum extends React.Component {
  state = {
    modalIsOpen: false,
    textInput: "",
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleCreate() {
    axios.post("http://localhost:3001/albums", {
      title: this.state.textInput,
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
          Создать альбом
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
            <h2 style={styles.ModalMainText}>Создать альбом</h2>
            <Button
              onClick={() => {
                this.closeModal();
              }}
            >
              X
            </Button>
          </div>
          <div style={styles.InputForm}>
            <div>Введите название</div>
            <form>
              <input
                type="text"
                onChange={(event) =>
                  this.setState({ textInput: event.target.value })
                }
              />
            </form>
            <Button
              onClick={async () => {
                await this.handleCreate();
                this.closeModal();
                window.location.reload();
              }}
            >
              Создать
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default CreateAlbum;
