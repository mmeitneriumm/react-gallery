import React, { Image } from "react";
import { styles, modalStyle } from "../style/styles";
import { Button } from "antd";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

class EditPhoto extends React.Component {
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

  handleCreate(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", e.target[0].value);
    formData.append("image", e.target[1].files[0]);
    formData.append("id", this.props.id);
    formData.append("albumId", this.props.albumId);

    axios.patch("http://localhost:3001/photos", formData).then(() => {
      this.closeModal();
      window.location.reload();
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
            <h2 style={styles.ModalMainText}>Изменить фото</h2>
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
              <p>Введите название фото</p>
              <input
                type="text"
                value={this.state.textInput}
                onChange={(e) => {
                  this.setState({ textInput: e.target.value });
                }}
              />
              <input type="file" name="image" />
              <input type="submit" />
            </form>
          </div>
        </Modal>
      </>
    );
  }
}

export default EditPhoto;
