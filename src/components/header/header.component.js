import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="#">My News</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              {/* <Router> */}
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/">Headlines<span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/search">News Search</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">Services</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">Contact</Link>
                  </li>
                </ul>
              {/* </Router> */}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}