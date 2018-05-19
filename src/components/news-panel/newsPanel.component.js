import React from "react";
import PubSub from "pubsub-js";

import Utility from "../../services/util";
import NewsCard from "../news-card/newsCard.component";
import NoResultFound from "../news-search/noResult.component";

export default class NewsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrolledDown: false,
      newsCardsList: [],
      lazyLoadingBottom: false
    }
  }

  componentDidMount() {
    document.addEventListener('pageScrolledDown', (event) => {
      this.setState({ isScrolledDown: true });
    });

    this.lazyLoadMoreNewsSubscription = PubSub.subscribe(props.LOAD_MORE_NEWS_EVENT, this.lazyLoadMoreNews.bind(this));
  }

  componentWillUnmount() {
    if(this.lazyLoadMoreNewsSubscription) {
      PubSub.unsubscribe(props.LOAD_MORE_NEWS_EVENT, this.lazyLoadMoreNews.bind(this));
    }
  }

  lazyLoadMoreNews(message, data) {

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.newsData && nextProps.newsData.articles) {
      return { newsCardsList: NewsPanel.getNewsCards(nextProps.newsData) }
    }
    return null;
  }

  static makeNewsCard(properties) {
    if (!properties.title || properties.title.trim().length == 0 || !properties.description || properties.description.trim().length == 0) {
      return null;
    }
    return (
      <NewsCard title={properties.title} content={properties.description} imageUrl={properties.urlToImage} author={properties.author} newsLink={properties.url} key={properties.key} />
    );
  }

  static getNewsCards(newsObj) {
    if (newsObj.articles && newsObj.articles.length == 0) {
      return <NoResultFound />
    }

    return newsObj.articles.map((article, index) => {
      article.key = Utility.generateRandomString(5);
      return NewsPanel.makeNewsCard(article)
    })
  }

  render() {
    return (
      <div className="container-fluid animationload" ref={el => this.headlinesElement = el}>
        <div className={this.props.isLoading ? "osahanloading" : ""}>
          {!this.props.isLoading ? this.state.newsCardsList : null}
          {this.props.scrollSupport && this.state.lazyLoadingBottom ? <div>Loading</div> : null}
        </div>
      </div>
    );
  }
}