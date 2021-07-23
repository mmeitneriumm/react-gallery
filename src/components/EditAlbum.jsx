import React, { Component } from "react";
import { styles, modalStyle } from "../style/styles";
import { Button } from "antd";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

class EditAlbum extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalIsOpen: false,
    textInput: this.props.title,
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleCreate() {
    axios.patch("http://localhost:3001/albums", {
      title: this.state.textInput,
      id: this.props.id,
    });
  }

  render() {
    return (
      <>
        <Button
          onClick={() => {
            this.openModal();
          }}
        >
          Изменить
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
            <h2 style={styles.ModalMainText}>Изменить альбом</h2>
            <Button
              onClick={() => {
                this.closeModal();
              }}
            >
              X
            </Button>
          </div>
          <div style={styles.InputForm}>
            <div>Измените название</div>
            <form>
              <input
                type="text"
                onChange={(event) =>
                  this.setState({ textInput: event.target.value })
                }
                value={this.state.textInput}
              />
            </form>
            <Button
              onClick={async () => {
                await this.handleCreate();
                this.closeModal();
                window.location.reload();
              }}
            >
              Изменить
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default EditAlbum;
