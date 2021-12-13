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

export async function getIssues(org: string, repo: string, page = 1) {
  const url = `https://api.github.com/search/issues?q=is:issue+is:open+repo:${org}/${repo}&per_page=15&page=${page}`;
  try {
    const res = await axios.get(url);
    const pageLinks = parseLink(res.headers.link);
    const pageCount = getPageCount(pageLinks);
    return {
      pageLinks,
      pageCount,
      data: res.data
    };
  } catch (err) {
    return await Promise.reject(err);
  }
}

export async function searchIssues(org: string, repo: string, query: string, page = 1) {
  const url = `https://api.github.com/search/issues?q=${query}+is:issue+is:open+repo:${org}/${repo}&per_page=15&page=${page}`;
  try {
    const res = await axios.get(url);
    const pageLinks = parseLink(res.headers.link);
    const pageCount = getPageCount(pageLinks);
    return {
      pageLinks,
      pageCount,
      data: res.data
    };
  } catch (err) {
    return await Promise.reject(err);
  }
}