import React from "react";
import PubSub from "pubsub-js";

import Utility from "../../services/util";
import NewsCard from "../news-card/newsCard.component";
import NoResultFound from "../news-search/noResult.component";
import Loader from "./loader.component";

export default class NewsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsCardsList: [],
      lazyLoadingBottom: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if ((nextProps.newsData && nextProps.newsData.articles) || nextProps.isScrolledDown) {
      return { newsCardsList: NewsPanel.getNewsCards(nextProps.newsData), lazyLoadingBottom: nextProps.isScrolledDown || false }
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
        {
          this.props.isLoading ?
            <Loader /> :
            <div>
              {!this.props.isLoading ? this.state.newsCardsList : null}
              {this.props.scrollSupport && this.state.lazyLoadingBottom ? <Loader /> : null}
            </div>
        }
      </div>
    );
  }
}