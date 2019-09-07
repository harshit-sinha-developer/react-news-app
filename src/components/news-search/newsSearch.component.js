import React from "react";
import PubSub from "pubsub-js";

import SearchBar from "./searchbar.component";
import NewsPanel from "../news-panel/newsPanel.component";
import Utils from "../../services/util";
import NewsService from "../../services/news";
import { PAGE_SCROLLED_BOTTOM_EVENT } from "../page-body/pageBody.props";

export default class NewsSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      showNewsPanel: false,
      newsPanelLoading: true,
      newsPanelScrolledDown: false
    };
    this.searchBarId = Utils.generateRandomString(5);
    this.SEARCH_TOPIC = 'SEARCH_BAR_CLICKED_' + this.searchBarId;
    this.searchPage = 1;
    this.newsService = new NewsService();
  }

  componentDidMount() {
    this.searchBarSubscription = PubSub.subscribe(this.SEARCH_TOPIC, this.searchBarClicked.bind(this));
    this.scrolledDownSubscription = PubSub.subscribe(PAGE_SCROLLED_BOTTOM_EVENT, this.pageScrolledDown.bind(this));
  }

  componentWillUnmount() {
    if(this.scrolledDownSubscription) {
      PubSub.unsubscribe(this.scrolledDownSubscription);
    }

    if(this.searchBarSubscription) {
      PubSub.unsubscribe(this.searchBarSubscription);
    }
  }

  pageScrolledDown(message, data) {
    this.setState({ newsPanelScrolledDown: true });
    this.fetchSearchData({}, { loadMoreData: true });
  }

  searchBarClicked(msg, data) {
    this.setState({ showNewsPanel: true });
    this.fetchSearchData({ q: data.text });
  }

  fetchSearchData(options = {}, additionalOptions = {}) {
    this.newsService.searchNews(options, { loadMoreData: additionalOptions.loadMoreData || false })
      .then(response => {
        this.setState({ 
          searchResults: response, 
          newsPanelLoading: false,
          newsPanelScrolledDown: false
         });
      });
  }

  render() {
    return (
      <div className="container">
        <SearchBar searchKey={this.searchBarId} />
        {this.state.showNewsPanel ? <NewsPanel scrollSupport={true} newsData={this.state.searchResults} isLoading={this.state.newsPanelLoading} isScrolledDown={this.state.newsPanelScrolledDown}/> : null}
      </div>
    );
  }
}