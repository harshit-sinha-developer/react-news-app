import axios from 'axios';
import SERVICES from '../config/services';
import { NEWS_API_KEY } from '../config/constants';
import Utils from "./util";

export default class NewsService {
  constructor() {
    this.metadata = new NewsData();
  }

  fetchMockHeadlines() {
    return axios('/mocks/mockNews.json')
      .then(result => result.data);
  }

  searchNews(options, additionalOptions = { loadMoreData: false }) {
    options = options || {};
    options.language = options.language || 'en';
    if (!additionalOptions.loadMoreData) {
      options.page = options.page || 1;
      this.metadata.flush();
    } else {
      options.page = options.page || this.metadata.getNewsOptions().page;
      ++options.page;
    }
    this.metadata.setNewsOptions(options);

    const requestOpts = {
      url: SERVICES.NEWS.SEARCH,
      params: this.metadata.getNewsOptions(),
      headers: {
        Authorization: `Bearer ${NEWS_API_KEY}`
      }
    };
    return axios(requestOpts)
      .then(results => {
        this.metadata.setNewsAdditionalData({ totalResults: (results && results.articles) ? results.articles.length : 0 });
        this.metadata.setMainData(options.page, results.data);
        return Promise.resolve(this.metadata.getMainDataAll());
      })
  }

  fetchTopHeadlines(options, additionalOptions = { loadMoreData: false }) {
    options = options || {};
    options.language = options.language || 'en';
    if (!additionalOptions.loadMoreData) {
      options.page = options.page || 1;
      this.metadata.flush();
    } else {
      options.page = options.page || this.metadata.getNewsOptions().page;
      ++options.page;
    }
    this.metadata.setNewsOptions(options);

    const requestOpts = {
      url: SERVICES.NEWS.HEADLINES,
      params: this.metadata.getNewsOptions(),
      headers: {
        Authorization: `Bearer ${NEWS_API_KEY}`
      }
    };

    return axios(requestOpts)
      .then(results => {
        this.metadata.setNewsAdditionalData({ totalResults: (results && results.articles) ? results.articles.length : 0 });
        this.metadata.setMainData(options.page, results.data);
        return Promise.resolve(this.metadata.getMainDataAll());
      })
  }
}

class NewsData {
  constructor() {
    this.DATA = {
      newsOptions: {
        pageSize: 20,
        page: 1,
        language: 'en'
      },
      mainData: {},
      additionalData: {
        totalResults: 0
      }
    };
  }

  getNewsOptions() {
    return this.DATA.newsOptions;
  }

  setNewsOptions(options) {
    this.DATA.newsOptions = Utils.merge(this.DATA.newsOptions, options);
  }

  getNewsAdditionalData() {
    return this.DATA.additionalData;
  }

  setNewsAdditionalData(data) {
    this.DATA.additionalData = Utils.merge(this.DATA.additionalData, data);
  }

  setMainData(page, data) {
    this.DATA.mainData[`PAGE_${page}`] = data;
  }

  getMainDataByPage(page) {
    return this.DATA.mainData[`PAGE_${page}`] || {};
  }

  getMainDataAll() {
    let allNewsData = { status: "ok", articles: [] };
    let pageNo = 1;
    while (this.DATA.mainData['PAGE_' + pageNo] !== undefined) {
      if (this.DATA.mainData[`PAGE_${pageNo}`].articles && this.DATA.mainData[`PAGE_${pageNo}`].articles.length) {
        allNewsData.articles = allNewsData.articles.concat(this.DATA.mainData[`PAGE_${pageNo}`].articles);
        allNewsData.totalResults = this.DATA.mainData[`PAGE_${pageNo}`].totalResults;
      }
      pageNo++;
    }
    return allNewsData;
  }

  getNewsData() {
    return this.DATA;
  }

  setNewsData(data) {
    this.DATA = Utils.merge(this.DATA, data);
  }

  flush() {
    this.DATA = {
      newsOptions: {
        pageSize: 20,
        page: 1,
        language: 'en'
      },
      mainData: {},
      additionalData: {
        totalResults: 0
      }
    }
  }
}

NewsData.DEFAULT_DATA = (function () {
  return {
    newsOptions: {
      pageSize: 20,
      page: 1,
      language: 'en'
    },
    mainData: {},
    additionalData: {
      totalResults: 0
    }
  }
})();
