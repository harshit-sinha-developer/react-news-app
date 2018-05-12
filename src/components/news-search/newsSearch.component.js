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
      showNewsPanel: false
    };
    this.searchBarId = Utils.generateRandomString(5);
    this.SEARCH_TOPIC = 'SEARCH_BAR_CLICKED_' + this.searchBarId;
  }

  componentDidMount() {
    PubSub.subscribe(this.SEARCH_TOPIC, this.searchBarClicked.bind(this));
  }

  searchBarClicked(msg, data) {
    console.log(msg, data);
    NewsService.searchNews({ q: data.text })
      .then(response => {
        console.log(response);
        this.setState({ searchResults: response.data, showNewsPanel: true })
      })
  }

  render() {
    return (
      <div className="container">
        <SearchBar searchKey={this.searchBarId} />
        {this.state.showNewsPanel ? <NewsPanel newsData={this.state.searchResults} isLoading={false}/> : null}
      </div>
    );
  }
}