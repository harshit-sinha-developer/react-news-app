import React from "react";
import NewsPanel from "../news-panel/newsPanel.component";
import Sidebar from "../sidebar/sidebar.component";
import NewsService from "../../services/news";

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrolledDown: false,
      newsData: [],
      newsPanelLoading: true
    };
  }

  componentDidMount() {
    NewsService.fetchTopHeadlines()
      .then(response => {
        let news = response.data;
        this.setState({ 
          newsData: news, 
          newsPanelLoading: false 
        });
      });
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  render() {
    return (
      <div className="container-fluid" ref={el => this.pageBodyElement = el}>
        <div className="row">
          <div className="col-lg-8">
            <NewsPanel isScrolledDown={this.state.isScrolledDown} scrollSupport={false} newsData={this.state.newsData} isLoading={this.state.newsPanelLoading}/>
          </div>
          <div className="col-lg-4">
            <Sidebar />
          </div>
        </div>
      </div>
    );
  }
}