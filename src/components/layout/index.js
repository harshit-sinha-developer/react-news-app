import React from "react";
import Header from "../header";
import PageBody from "../page-body";

export default class Layout extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <PageBody />
      </div>
    )
  }
}
