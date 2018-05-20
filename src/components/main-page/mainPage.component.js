import React from "react";
import PubSub from "pubsub-js";

import NewsPanel from "../news-panel/newsPanel.component";
import Sidebar from "../sidebar/sidebar.component";
import { LINK_EVENT_NAME } from "../sidebar/sidebar.props";
import NewsService from "../../services/news";
import { PAGE_SCROLLED_BOTTOM_EVENT } from "../page-body/pageBody.props";
import Utils from "../../services/util";

const LOAD_MORE_NEWS_EVENT = `MAIN_LOAD_MORE_NEWS_${Utils.generateRandomString(5)}`;

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsPanelScrolledDown: false,
      newsData: {},
      newsPanelLoading: true
    };
    this.newsService = new NewsService();
  }

  componentDidMount() {
    this.fetchHeadlinesAndRender();
    this.sideBarSubsription = PubSub.subscribe(LINK_EVENT_NAME, this.sideBarLinkClicked.bind(this));
    this.isScrolledDownSubscription = PubSub.subscribe(PAGE_SCROLLED_BOTTOM_EVENT, this.pageScrolledDown.bind(this));
  }

  componentWillUnmount() {
    if (this.sideBarSubsription) {
      PubSub.unsubscribe(this.sideBarSubsription);
    }
    if (this.isScrolledDownSubscription) {
      PubSub.unsubscribe(this.isScrolledDownSubscription);
    }
    this.newsService = null;
  }

  sideBarLinkClicked(message, data) {
    let options = {};
    if (data) {
      this.setState({ newsPanelLoading: true, newsData: [] })
      this.fetchHeadlinesAndRender(data);
    }
  }

  pageScrolledDown(message, data) {
    this.setState({ newsPanelScrolledDown: true });
    this.newsPanelFetchMoreData();
  }

  fetchHeadlinesAndRender(options = {}, additionalOptions = {}) {
    this.newsService.fetchTopHeadlines(options, { loadMoreData: additionalOptions.loadMoreData || false })
      .then(news => {
        this.setState({
          newsData: news,
          newsPanelLoading: false,
          newsPanelScrolledDown: false
        });
      });
  }

  newsPanelFetchMoreData() {
    this.fetchHeadlinesAndRender({}, { loadMoreData: true });
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  render() {
    return (
      <div className="container-fluid" ref={el => this.pageBodyElement = el}>
        <div className="row">
          <div className="col-lg-10">
            <NewsPanel scrollSupport={true} newsData={this.state.newsData} isLoading={this.state.newsPanelLoading} isScrolledDown={this.state.newsPanelScrolledDown} />
          </div>
          <div className="col-lg-2">
            <Sidebar />
          </div>
        </div>
      </div>
    );
  }
}