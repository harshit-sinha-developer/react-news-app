import Utils from "../../services/util";

export default class NewsData {
  constructor() {
    this.DATA = {
      newsOptions: {
        pageSize: 20,
        page: 1
      },
      additionalData: {
        totalResults: 0
      }
    }
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

  getNewsData() {
    return this.DATA;
  }

  setNewsData(data) {
    this.DATA = Utils.merge(this.DATA, data);
  }
}