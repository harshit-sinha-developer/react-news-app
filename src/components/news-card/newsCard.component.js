import React from "react";
import styles from "./newsCard.css";

const NewsCard = (props) => {
  return (
    <div className={styles.news_card}>
      <a href={props.newsLink}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.content}</p>
            <p className="card-text"><small className="text-muted">{props.author}</small></p>
          </div>
          { props.imageUrl ? <img className="card-img-bottom" src={props.imageUrl} /> : null}
        </div>
      </a>
    </div>
  );
}

export default NewsCard;