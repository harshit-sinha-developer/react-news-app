import React from "react";
import PubSub from "pubsub-js";

import NewsPanel from "../news-panel/newsPanel.component";
import Sidebar from "../sidebar/sidebar.component";
import { LINK_EVENT_NAME } from "../sidebar/sidebar.component";
import NewsService from "../../services/news";


export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrolledDown: false,
      newsData: [],
      newsPanelLoading: true
    };
  }

  componentDidMount() {
    this.fetchHeadlinesAndRender();
    PubSub.subscribe(LINK_EVENT_NAME, this.sideBarLinkClicked.bind(this));
  }

  sideBarLinkClicked(message, data) {
    let options = {};
    if (data && Object.keys(data).length > 0) {
      this.setState({ newsPanelLoading: true, newsData: [] })
      this.fetchHeadlinesAndRender(data);
    }
  }

  fetchHeadlinesAndRender(options) {
    NewsService.fetchTopHeadlines(options)
      .then(response => {
        let news = response.data;
        this.setState({
          newsData: news,
          newsPanelLoading: false
        });
      });
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  render() {
    return (
      <div className="container-fluid" ref={el => this.pageBodyElement = el}>
        <div className="row">
          <div className="col-lg-10">
            <NewsPanel isScrolledDown={this.state.isScrolledDown} scrollSupport={false} newsData={this.state.newsData} isLoading={this.state.newsPanelLoading} />
          </div>
          <div className="col-lg-2">
            <Sidebar />
          </div>
        </div>
      </div>
    );
  }
}