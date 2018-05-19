import React from "react";
import PubSub from "pubsub-js";

import NewsPanel from "../news-panel/newsPanel.component";
import { SOURCES_LIST, SOURCE_LIST_ITEM_EVENT, SOURCES_DROPDOWN_TITLE } from "./sources.props";
import SourceList from "./sourceList.component";
import NewsService from "../../services/news";

export default class SourcePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: [],
      showNewsPanel: false,
      newsPanelLoading: true
    };
    this.sourceListSubscription = null;
  }

  componentDidMount() {
    this.sourceListSubscription = PubSub.subscribe(SOURCE_LIST_ITEM_EVENT, this.sourceListItemClicked.bind(this));
  }

  componentWillUnmount() {
    if (this.sourceListSubscription) {
      PubSub.unsubscribe(this.sourceListSubscription);
    }
  }

  sourceListItemClicked(msg, data) {
    if (data.code) {
      this.fetchHeadlinesAndRender({ sources: data.code });
    }
  }

  fetchHeadlinesAndRender(options) {
    this.setState({ showNewsPanel: true });

    NewsService.fetchTopHeadlines(options)
      .then(response => {
        let news = response.data;
        this.setState({
          newsData: news,
          newsPanelLoading: false
        });
      });
  }

  render() {
    return (
      <div className='container'>
        <SourceList list={SOURCES_LIST} title={SOURCES_DROPDOWN_TITLE} />
        {this.state.showNewsPanel ? <NewsPanel newsData={this.state.newsData} isLoading={this.state.newsPanelLoading} /> : null}
      </div>
    );
  }
}