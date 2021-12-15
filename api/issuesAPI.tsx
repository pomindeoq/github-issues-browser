import axios, { AxiosResponse } from 'axios';
import parseLink from 'parse-link-header';
import { ApiResponse, GithubApiResponse } from '../models/interfaces';

export async function getIssues(org: string, repo: string, page = 1) : Promise<ApiResponse> {
  const url = `https://api.github.com/search/issues?q=is:issue+is:open+repo:${org}/${repo}&per_page=15&page=${page}`;
  try {
    const res = await axios.get(url);
    const pageLinks = parseLink(res.headers.link);
    console.log(pageLinks);
    return {
      pageLinks, 
      data: res.data
    };
  } catch (err) {
    return await Promise.reject(err);
  }
}

export async function searchIssues(org: string, repo: string, query: string, page = 1) : Promise<ApiResponse> {
  const url = `https://api.github.com/search/issues?q=${query}+is:issue+is:open+repo:${org}/${repo}&per_page=15&page=${page}`;
  console.log(url);
  try {
    const res = await axios.get(url);
    const pageLinks = parseLink(res.headers.link);
    return {
      pageLinks,
      data: res.data
    };
  } catch (err) {
    return await Promise.reject(err);
  }
}