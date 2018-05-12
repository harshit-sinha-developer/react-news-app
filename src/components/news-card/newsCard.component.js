import React from "react";
import styles from "./newsCard.css";

export default class NewsCard extends React.Component {
  /**
   * Creates an instance of NewsCard.
   * @param {{title: string, dateTime: string, author: string, imageUrl: string, content: string, newsLink: string, isLoading: boolean}} props 
   * @memberof NewsCard
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.news_card}>
        <a href={this.props.newsLink}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{this.props.title}</h5>
              <p className="card-text">{this.props.content}</p>
              <p className="card-text"><small className="text-muted">{this.props.author}</small></p>
            </div>
            { this.props.imageUrl ? <img className="card-img-bottom" src={this.props.imageUrl} /> : null}
          </div>
        </a>
      </div>
    );
  }
}