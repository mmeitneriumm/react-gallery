import React, { Component } from "react";
import Router from "./AppRouter";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less
class App extends Component {
  render() {
    return <Router />;
  }
}

export default App;
