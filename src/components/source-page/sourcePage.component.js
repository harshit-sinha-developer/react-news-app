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
      newsPanelLoading: true,
      sourceList: SOURCES_LIST
    };
    this.sourceListSubscription = null;
    this.newsService = new NewsService();
  }

  componentDidMount() {
    this.sourceListSubscription = PubSub.subscribe(SOURCE_LIST_ITEM_EVENT, this.sourceListItemClicked.bind(this));

    this.newsService.fetchNewsSources()
      .then(sourceData => {
        console.log("**** sourceData", sourceData)
        this.setState({ sourceList: sourceData });
      });
  }

  componentWillUnmount() {
    if (this.sourceListSubscription) {
      PubSub.unsubscribe(this.sourceListSubscription);
    }
    this.newsService = null;
  }

  sourceListItemClicked(msg, data) {
    if (data.code) {
      this.fetchHeadlinesAndRender({ sources: data.code });
    }
  }

  fetchHeadlinesAndRender(options) {
    this.setState({ showNewsPanel: true });

    this.newsService.fetchTopHeadlines(options)
      .then(news => {
        this.setState({
          newsData: news,
          newsPanelLoading: false
        });
      });
  }

  render() {
    return (
      <div className='container'>
        <SourceList list={this.state.sourceList} title={SOURCES_DROPDOWN_TITLE} />
        {this.state.showNewsPanel ? <NewsPanel newsData={this.state.newsData} isLoading={this.state.newsPanelLoading} /> : null}
      </div>
    );
  }
}