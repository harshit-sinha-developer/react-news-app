import axios from 'axios';
import SERVICES from '../config/services';
import { NEWS_API_KEY } from '../config/constants';

export default class NewsService {
  constructor() {

  }

  fetchMockHeadlines() {
    return axios('/mocks/mockNews.json')
      .then(result => result.data);
  }

  fetchTopHeadlines(options) {
    options = options || {};
    options.country = options.country || 'in';
    const requestOpts = {
      url: SERVICES.NEWS.HEADLINES,
      params: options,
      headers: {
        Authorization: `Bearer ${NEWS_API_KEY}`
      }
    };

    return axios(requestOpts);
  }
}