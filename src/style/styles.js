let styles = {
  //  Gallery.jsx
  GalleryText: {
    fontSize: 50,
    margin: 0,
    fontWeight: "bold",
  },
  GalleryMain: {
    display: "flex",
    justifyContent: "center",
  },
  GalleryList: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: 40,
  },
  TextAndButton: {
    display: "flex",
    justifyContent: "center",
    padding: 20,
  },
  Button: {
    margin: 30,
  },
  Main: {
    backgroundColor: "#EEF0F4",
  },

  //  Album.jsx
  Card: {
    display: "flex",
    justifyContent: "center",
    width: 300,
  },
  Img: {
    width: 300,
    display: "flex",
    justifyContent: "center",
  },
  CardTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
  CountText: {
    textAlign: "center",
    color: "black",
  },
  Buttons: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
  },

  //  Photos.jsx
  PhotoCard: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  AllCards: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gap: 40,
    justifyItems: "center",
  },
  ModalImage: {
    display: "flex",
    flexDirection: "column",
  },

  // CreateAlbum.jsx
  ModalForm: {
    display: "flex",
    justifyContent: "center",
  },
  ModalMainText: {
    fontWeight: "bold",
    fontSize: 50,
  },
  InputForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 50,
  },
};

export { styles, modalStyle };
