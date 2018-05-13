import React from "react";
import Utility from "../../services/util";

import NewsCard from "../news-card/newsCard.component";
import NoResultFound from "../news-search/noResult.component";

export default class NewsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrolledDown: false,
      newsCardsList: []
    }
  }

  componentDidMount() {
    document.addEventListener('pageScrolledDown', (event) => {
      this.setState({ isScrolledDown: true });
    })
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
          {this.state.isScrolledDown && this.props.scrollSupport ? <div>Loading</div> : null}
        </div>
      </div>
    );
  }
}