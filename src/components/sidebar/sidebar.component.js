import React from "react";
import PubSub from "pubsub-js";

import Utils from "../../services/util";
import styles from "./sidebar.css";

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
    stateObj.activeLinks[groupName] = {
      dataKey: uniqueKey,
      code: groupsObj[groupName].ELEMENTS[elementName].code
    };

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

const SIDEBAR_LINKS = {
  GROUPS: {
    COUNTRIES: {
      ELEMENTS: {
        INDIA: {
          code: 'in',
          display: 'National',
          dataKey: 'SIDEBAR_' + Utils.generateRandomString(5)
        },
        WORLD: {
          code: null,
          display: 'International',
          dataKey: 'SIDEBAR_' + Utils.generateRandomString(5)
        },
        USA: {
          code: 'us',
          display: 'USA',
          dataKey: 'SIDEBAR_' + Utils.generateRandomString(5)
        },
        CHINA: {
          code: 'cn',
          display: 'China',
          dataKey: 'SIDEBAR_' + Utils.generateRandomString(5)
        },
        UK: {
          code: 'gb',
          display: 'UK',
          dataKey: 'SIDEBAR_' + Utils.generateRandomString(5)
        }
      },
      API_FIELD: 'country',
      display: 'Countries',
      key: 'countryEle',
      statePropertyName: 'activeCountryLinkId'
    },
    CATEGORIES: {
      ELEMENTS: {
        BUSINESS: {
          code: 'business',
          display: 'Business',
          dataKey: 'SIDEBAR_' + Utils.generateRandomString(5)
        },
        ENTERTAINMENT: {
          code: 'entertainment',
          display: 'Entertainment',
          dataKey: 'SIDEBAR_' + Utils.generateRandomString(5)
        },
        TECHNOLOGY: {
          code: 'technology',
          display: 'Technology',
          dataKey: 'SIDEBAR_' + Utils.generateRandomString(5)
        },
        SPORTS: {
          code: 'sports',
          display: 'Sports',
          dataKey: 'SIDEBAR_' + Utils.generateRandomString(5)
        },
        SCIENCE: {
          code: 'science',
          display: 'Science',
          dataKey: 'SIDEBAR_' + Utils.generateRandomString(5)
        },
        HEALTH: {
          code: 'health',
          display: 'Health',
          dataKey: 'SIDEBAR_' + Utils.generateRandomString(5)
        }
      },
      API_FIELD: 'category',
      display: 'Categories',
      statePropertyName: 'activeCategoryLinkId'
    }
  }
}

export const LINK_EVENT_NAME = 'SIDEBAR_' + Utils.generateRandomString(5);