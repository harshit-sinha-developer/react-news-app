import Utils from "../../services/util";

export const SIDEBAR_LINKS = {
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