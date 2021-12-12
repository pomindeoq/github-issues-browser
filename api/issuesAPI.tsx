import axios from 'axios';
import parseLink from 'parse-link-header';

const isLastPage = (pageLinks) => {
  return Object.keys(pageLinks).length === 2 &&
    pageLinks.first && pageLinks.prev;
}

const getPageCount = (pageLinks) => {
  if(!pageLinks) {
    return 0;
  }
  if(isLastPage(pageLinks)) {
    return parseInt(pageLinks.prev.page, 10) + 1;
  } else if(pageLinks.last) {
    return parseInt(pageLinks.last.page, 10)
  } else {
    return 0;
  }
}

export function getIssues(org: string, repo: string, page = 1) {
  const url = `https://api.github.com/repos/${org}/${repo}/issues?per_page=15&page=${page}`;
  return axios.get(url)
    .then(res => {
      const pageLinks = parseLink(res.headers.link);
      const pageCount = getPageCount(pageLinks);
      return {
        pageLinks,
        pageCount,
        data: res.data
      };
    })
    .catch(err => Promise.reject(err));
}

export function getFilteredIssues(org: string, repo: string, filter: string, value: string, page = 1) {
  const url = `https://api.github.com/repos/${org}/${repo}/issues?${filter}=${value}&per_page=15&page=${page}`;
  return axios.get(url)
    .then(res => {
      const pageLinks = parseLink(res.headers.link);
      const pageCount = getPageCount(pageLinks);
      return {
        pageLinks,
        pageCount,
        data: res.data
      };
    })
    .catch(err => Promise.reject(err));
}