import React from "react";
import PubSub from "pubsub-js";
import Utils from "../../services/util";

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.searchKey = props.searchKey;
    this.SEARCH_TOPIC = 'SEARCH_BAR_CLICKED_' + (props.searchKey ? props.searchKey : '');
    this.searchClicked = this.searchClicked.bind(this);
  }

  searchClicked() {
    let searchInputElement = document.getElementById('search_' + this.searchKey);
    let searchText = searchInputElement.value;
    if (searchText && searchText.length > 0) {
      PubSub.publish(this.SEARCH_TOPIC, { text: searchText })
    }
  }

  render() {
    return (
      <div className='input-group md-form form-sm form-2 pl-0'>
        <input className='form-control my-0 py-1 amber-border' id={'search_' + this.searchKey} type="text" placeholder="Search" aria-label="Search" />
        <div className='input-group-append'>
          <span className='input-group-text amber lighten-3' id="basic-text1" onClick={this.searchClicked}>
            <i className='fa fa-search text-grey' aria-hidden="true"></i>
          </span>
        </div>
      </div>
    );
  }

}