import * as API from '../api/issuesAPI';

export const SEARCH_ISSUES_BEGIN = 'SEARCH_ISSUES_BEGIN';
export const SEARCH_ISSUES_SUCCESS = 'SEARCH_ISSUES_SUCCESS';
export const SEARCH_ISSUES_FAILURE = 'SEARCH_ISSUES_FAILURE';
export const GET_ISSUES_BEGIN = 'GET_ISSUES_BEGIN';
export const GET_ISSUES_SUCCESS = 'GET_ISSUES_SUCCESS';
export const GET_ISSUES_FAILURE = 'GET_ISSUES_FAILURE';
export interface Label {
    id: number
    name: string
    color: string
}
  
export interface User {
    login: string
    avatar_url: string
}

export interface Issue {
    id: number
    title: string
    number: number
    user: User
    body: string
    labels: Label[]
    comments_url: string
    state: 'open' | 'closed'
    comments: number,
    url: string
}

export function getIssuesSuccess(issueResponse) {
  return {
    type: GET_ISSUES_SUCCESS,
    payload: {
      pageCount: issueResponse.pageCount,
      pageLinks: issueResponse.pageLinks,
      issues: issueResponse.data.items,
      loading: false
    }
  };
}

export function searchIssuesSuccess(issueResponse) {
  return {
    type: SEARCH_ISSUES_SUCCESS,
    payload: {
      pageCount: issueResponse.pageCount,
      pageLinks: issueResponse.pageLinks,
      issues: issueResponse.data.items,
      loading: false
    }
  };
}
  
export function getIssuesFailure(error: Error) {
  return {
      type: GET_ISSUES_FAILURE,
      error
      };
  }

export function searchIssues(org: string, repo: string, query: string, page: number) {
  return dispatch => {
    dispatch({type: SEARCH_ISSUES_BEGIN});
    API.searchIssues(org, repo, query, page)
      .then(res => dispatch(searchIssuesSuccess(res)))
      .catch(error => dispatch(getIssuesFailure(error)));
  };
}
  
export function getIssues(org: string, repo: string, page: number) {
  return dispatch => {
    dispatch({type: GET_ISSUES_BEGIN});
    API.getIssues(org, repo, page)
      .then(res => dispatch(getIssuesSuccess(res)))
      .catch(error => dispatch(getIssuesFailure(error)));
  };
}