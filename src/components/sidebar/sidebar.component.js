import React from "react";
import PubSub from "pubsub-js";

import Utils from "../../services/util";
import styles from "./sidebar.css";
import { LINK_EVENT_NAME, SIDEBAR_LINKS } from "./sidebar.props";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLinks: {}
    };
    this.linkClicked = this.linkClicked.bind(this);
  }

  linkClicked(event) {
    let linkElement = event.currentTarget;
    let groupName = linkElement.getAttribute('data-news-group');
    let elementName = linkElement.getAttribute('data-news-ele');
    let uniqueKey = linkElement.getAttribute('data-key');

    let groupsObj = SIDEBAR_LINKS.GROUPS;
    let stateObj = {
      activeLinks: this.state.activeLinks
    }

    if (stateObj.activeLinks[groupName] && stateObj.activeLinks[groupName].dataKey == uniqueKey) {
      // Unselect link if it was already selected
      stateObj.activeLinks[groupName] = null;
    } else {
      // Select link if not selected
      stateObj.activeLinks[groupName] = {
        dataKey: uniqueKey,
        code: groupsObj[groupName].ELEMENTS[elementName].code
      };
    }

    let data = {};

    Object.keys(groupsObj).forEach(group => {
      if (stateObj.activeLinks[group]) {
        data[groupsObj[group].API_FIELD] = stateObj.activeLinks[group].code;
      }
    })

    PubSub.publish(LINK_EVENT_NAME, data);
    this.setState(stateObj);
  }

  getSideBar() {
    let sideBardElements = [];
    Object.keys(SIDEBAR_LINKS.GROUPS).forEach(group => {
      let groupObj = SIDEBAR_LINKS.GROUPS[group];

      let groupElement = (
        <li className="nav-header" key={'Group_' + groupObj.key}>{groupObj.display}</li>
      );
      sideBardElements.push(groupElement);

      Object.keys(groupObj.ELEMENTS).forEach(element => {
        let elementObj = groupObj.ELEMENTS[element];

        let linkElement = (
          <li className={'nav-item ' + (this.state.activeLinks[group] && (this.state.activeLinks[group].dataKey == elementObj.dataKey) ? styles.active : '')} onClick={this.linkClicked} data-key={elementObj.dataKey} key={'SideEle_' + elementObj.code} data-news-group={group} data-news-ele={element}>
            <a class="nav-link" href="#">{elementObj.display}</a>
          </li>
        );
        sideBardElements.push(linkElement);
      });
    });
    return sideBardElements;
  }

  render() {
    return (
      <div className={'container ' + styles.sidebar_component}>
        <ul class="nav nav-list flex-column">
          {this.getSideBar()}
        </ul>
      </div>
    );
  }
}