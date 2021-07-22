import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Gallery from "./page/Gallery";
import Photo from "./page/Photos";

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Route exact path="/" render={(props) => <Gallery {...props} />} />
        <Route
          exact
          path="/photos/:id"
          render={(props) => <Photo {...props} />}
        />
      </Router>
    );
  }
}

export default AppRouter;
