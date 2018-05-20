import React from "react";
import { BrowserRouter as Router, Route, Link, IndexRoute } from "react-router-dom";
import PubSub from "pubsub-js";

import MainPage from '../main-page/mainPage.component';
import NewsSearch from '../news-search/newsSearch.component';
import SourcePage from '../source-page/sourcePage.component';
import { PAGE_SCROLLED_BOTTOM_EVENT, PAGE_SCROLL_WAIT_TIME } from './pageBody.props';

export default class PageBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.pageScrolled = this.pageScrolled.bind(this);
    this.lastScrollTime = null;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.pageScrolled);
  }

  componentWillUnmount() {
    this.lastScrollTime = null;
    window.removeEventListener('scroll', this.pageScrolled);
  }

  pageScrolled() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if(!this.lastScrollTime || Date.now() - this.lastScrollTime >= PAGE_SCROLL_WAIT_TIME) {
        this.lastScrollTime = Date.now();
        PubSub.publish(PAGE_SCROLLED_BOTTOM_EVENT, {});
      }
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Route exact path='/' component={MainPage} />
        <Route path='/search' component={NewsSearch} />
        <Route path='/sources' component={SourcePage} />
      </div>
    );
  }
}