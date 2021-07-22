import React, { Component } from "react";
import { styles, modalStyle } from "../style/styles";
import { Button } from "antd";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

class DeleteModal extends React.Component {
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

  handleDelete() {
    axios.delete("http://localhost:3001/" + this.props.type, {
      data: {
        id: this.props.id,
      },
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
          Удалить
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
            <h2 style={styles.ModalMainText}>Удалить</h2>
            <Button
              onClick={() => {
                this.closeModal();
              }}
            >
              X
            </Button>
          </div>
          <div style={styles.InputForm}>
            <div>Вы уверенны, что хотите удалить?</div>
            <div>
              <Button
                onClick={async () => {
                  await this.handleDelete();
                  this.closeModal();
                  window.location.reload();
                }}
              >
                Да
              </Button>
              <Button
                onClick={async () => {
                  this.closeModal();
                }}
              >
                Нет
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default DeleteModal;
