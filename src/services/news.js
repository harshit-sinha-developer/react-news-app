import axios from 'axios';
import SERVICES from '../config/services';
import { NEWS_API_KEY } from '../config/constants';

export default class NewsService {
  constructor() {
  }

  static fetchMockHeadlines() {
    return axios('/mocks/mockNews.json')
      .then(result => result.data);
  }

  static searchNews(options) {
    options = options || {};
    options.language = options.language || 'en';
    const requestOpts = {
      url: SERVICES.NEWS.SEARCH,
      params: options,
      headers: {
        Authorization: `Bearer ${NEWS_API_KEY}`
      }
    };
    return axios(requestOpts);
  }

  static fetchTopHeadlines(options) {
    options = options || {};
    options.language = options.language || 'en';
    const requestOpts = {
      url: SERVICES.NEWS.HEADLINES,
      params: options,
      headers: {
        Authorization: `Bearer ${NEWS_API_KEY}`
      }
    };

    return axios(requestOpts)
      .then(results => {
        return Promise.resolve(results);
      })
  }
}