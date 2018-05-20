import Utils from '../../services/util';

export const HEADER_LINKS = [
  {
    display: 'Headlines',
    address: '/',
    uniqueKey: 'Header_' + Utils.generateRandomString(5)
  },
  {
    display: 'News Search',
    address: '/search',
    uniqueKey: 'Header_' + Utils.generateRandomString(5)
  },
  {
    display: 'Sources',
    address: '/sources',
    uniqueKey: 'Header_' + Utils.generateRandomString(5)
  }
];

export const SITE_TITLE = {
  display: 'News Room',
  address: '/'
};