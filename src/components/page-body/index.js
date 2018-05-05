import React from "react";
import NewsService from "../../services/news";

export default class PageBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = { headlines: '', newsElements: [] };
    this.newsService = new NewsService();
  }

  componentDidMount() {
    this.newsService.fetchHeadlines()
      .then(news => {
        this.setState({ headlines: news });
        this.setState({ newsElements: this.state.headlines.articles.map((article, index) => <li key={'news_' + index}>{article.title}</li>) });
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8">
            <ul>{this.state.newsElements}</ul>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    );
  }
}