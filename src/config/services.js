const SERVICES = {
  HOSTS: {
    NEWS: 'https://newsapi.org'
  },
  APIS: {
    NEWS: {
      HEADLINES: '/v2/top-headlines',
      SEARCH: '/v2/everything'
    }
  }
};

// Utility
const LOADED_APIS = (function() {
  const APIS = {};
  Object.keys(SERVICES.HOSTS).forEach(host => {
    APIS[host] = {};
    Object.keys(SERVICES.APIS[host]).forEach(api => {
      let HOST_URL = new URL(SERVICES.HOSTS[host]);
      let API_URL = (new URL(SERVICES.APIS[host][api], HOST_URL)).href;
      APIS[host][api] = API_URL;
    });
  });
  return APIS;
})();

export default LOADED_APIS;