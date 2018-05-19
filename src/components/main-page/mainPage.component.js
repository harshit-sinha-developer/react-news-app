import React from "react";
import PubSub from "pubsub-js";

import NewsPanel from "../news-panel/newsPanel.component";
import Sidebar from "../sidebar/sidebar.component";
import { LINK_EVENT_NAME } from "../sidebar/sidebar.props";
import NewsService from "../../services/news";
import { PAGE_SCROLLED_BOTTOM_EVENT } from "../page-body/pageBody.props";
import Utils from "../../services/util";
import NewsData from "./newsPanel.data";

const LOAD_MORE_NEWS_EVENT = `MAIN_LOAD_MORE_NEWS_${Utils.generateRandomString(5)}`;

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsPanelScrolledDown: false,
      newsData: [],
      newsPanelLoading: true
    };
    this.newsDataObj = new NewsData();
  }

  componentDidMount() {
    this.newsDataObj.setNewsOptions({ page: 0 });
    this.newsDataObj.setNewsAdditionalData({ totalResults: 0 });
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
  }

  sideBarLinkClicked(message, data) {
    let options = {};
    if (data) {
      this.setState({ newsPanelLoading: true, newsData: [] })
      this.newsDataObj.setNewsOptions(data);
      this.fetchHeadlinesAndRender(data);
    }
  }

  pageScrolledDown(message, data) {
    PubSub.publish(LOAD_MORE_NEWS_EVENT, {});
    this.setState({ newsPanelScrolledDown: true });

  }

  fetchHeadlinesAndRender(options) {
    NewsService.fetchTopHeadlines(options)
      .then(response => {
        let news = response.data;
        this.newsDataObj.setNewsAdditionalData({ totalResults: news.articles.length });
        this.setState({
          newsData: news,
          newsPanelLoading: false
        });
      });
  }

  newsPanelFetchMoreData() {
    this.newsDataObj.setNewsOptions({ page: this.newsDataObj.getNewsOptions().page + 1 });
    this.fetchHeadlinesAndRender(this.newsDataObj.getNewsOptions);
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  render() {
    return (
      <div className="container-fluid" ref={el => this.pageBodyElement = el}>
        <div className="row">
          <div className="col-lg-10">
            <NewsPanel scrollSupport={true} newsData={this.state.newsData} isLoading={this.state.newsPanelLoading} LOAD_MORE_NEWS_EVENT={LOAD_MORE_NEWS_EVENT} isScrolledDown={this.state.newsPanelScrolledDown} />
          </div>
          <div className="col-lg-2">
            <Sidebar />
          </div>
        </div>
      </div>
    );
  }
}