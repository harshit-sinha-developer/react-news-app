import React from "react";
import NewsService from "../../services/news";

export default class Headlines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headlines: '',
      newsElements: [],
      isLoading: true
    };
    this.newsService = new NewsService();
  }

  componentDidMount() {
    this.newsService.fetchTopHeadlines()
      .then(response => {
        let news = response.data;
        this.setState({ headlines: news });
        this.setState({ newsElements: this.state.headlines.articles.map((article, index) => <li key={'news_' + index}>{article.title}</li>) });
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <div className="container-fluid animationload">
        <div className={this.state.isLoading ? "osahanloading" : ""}>
          <ul>{this.state.newsElements}</ul>
        </div>
      </div>
    );
  }
}