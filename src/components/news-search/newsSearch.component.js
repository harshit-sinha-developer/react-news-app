import React from "react";
import PubSub from "pubsub-js";

import SearchBar from "./searchbar.component";
import NewsPanel from "../news-panel/newsPanel.component";
import Utils from "../../services/util";
import NewsService from "../../services/news";

export default class NewsSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      showNewsPanel: false,
      newsPanelLoading: true
    };
    this.searchBarId = Utils.generateRandomString(5);
    this.SEARCH_TOPIC = 'SEARCH_BAR_CLICKED_' + this.searchBarId;
    this.searchPage = 1;
  }

  componentDidMount() {
    PubSub.subscribe(this.SEARCH_TOPIC, this.searchBarClicked.bind(this));
  }

  searchBarClicked(msg, data) {
    this.setState({ showNewsPanel: true })
    NewsService.searchNews({ q: data.text })
      .then(response => {
        this.setState({ searchResults: response.data, newsPanelLoading: false })
      });
  }

  render() {
    return (
      <div className="container">
        <SearchBar searchKey={this.searchBarId} />
        {this.state.showNewsPanel ? <NewsPanel newsData={this.state.searchResults} isLoading={this.state.newsPanelLoading} /> : null}
      </div>
    );
  }
}