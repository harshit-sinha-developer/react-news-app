import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from "../header/header.component";
import PageBody from "../page-body/pageBody.component";

export default class Layout extends React.Component {
  render() {
    return (
      <Router>
      <div className="container">
        <Header />
        <PageBody />
      </div>
      </Router>
    )
  }
}
