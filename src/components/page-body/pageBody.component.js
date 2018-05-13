import React from "react";
import { BrowserRouter as Router, Route, Link, IndexRoute } from "react-router-dom";

import MainPage from '../main-page/mainPage.component';
import NewsSearch from '../news-search/newsSearch.component';

export default class PageBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container-fluid">
        {/* <Router>
          <div> */}
            <Route exact path='/' component={MainPage} />
            <Route path='/search' component={NewsSearch} />
          {/* </div>
        </Router> */}
      </div>
    );
  }
}