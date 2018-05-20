import React from "react";
import PubSub from "pubsub-js";

import Utils from "../../services/util";
import styles from "./sourceList.css";
import { SOURCE_LIST_ITEM_EVENT } from "./sources.props";

const DROP_DOWN_MENU_ID = "dropdownMenuButton_" + Utils.generateRandomString(5);

export default class SourceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sourceListItemClicked = this.sourceListItemClicked.bind(this);
  }

  sourceListItemClicked(event, { dataKey }) {
    PubSub.publish(SOURCE_LIST_ITEM_EVENT, { code: dataKey });
  }

  getNewsSourceElements(SOURCE_LIST) {
    let sourceElementList = sourceElementList = Object.keys(SOURCE_LIST).map(sourceName => {
      let sourceObj = SOURCE_LIST[sourceName];
      return (
        <li onClick={e => this.sourceListItemClicked(e, { dataKey: sourceObj.SOURCE_ID })}>
          <a className="dropdown-item" href="#" key={sourceObj.KEY} data-key={sourceObj.SOURCE_ID}>
            {sourceObj.SOURCE_NAME}
          </a>
        </li>
      );
    });
    return sourceElementList;
  }

  render() {
    return (
      <div class="btn-group container-fluid">
        <button type="button" class="btn btn-default dropdown-toggle container-fluid" data-toggle="dropdown">{this.props.title}<span class="caret"></span></button>
        <ul className={"dropdown-menu container-fluid " + styles.scrollable_menu} role="menu">
          {this.getNewsSourceElements(this.props.list)}
        </ul>
      </div>
    );
  }
}