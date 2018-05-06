import React from "react";
import Headlines from "../headlines";
import styles from './index.css';
export default class PageBody extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8">
            <Headlines />
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    );
  }
}