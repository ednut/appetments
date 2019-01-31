import React, { Component } from "react";
import Header from "./Header";

class ContentWrap extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default ContentWrap;
