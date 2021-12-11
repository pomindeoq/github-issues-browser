import * as API from '../api/issuesAPI';

export const GET_ISSUE_BEGIN = 'GET_ISSUE_BEGIN';
export const GET_ISSUE_SUCCESS = 'GET_ISSUE_SUCCESS';
export const GET_ISSUE_FAILURE = 'GET_ISSUE_FAILURE';
export const GET_ISSUES_BEGIN = 'GET_ISSUES_BEGIN';
export const GET_ISSUES_SUCCESS = 'GET_ISSUES_SUCCESS';
export const GET_ISSUES_FAILURE = 'GET_ISSUES_FAILURE';
export const GET_COMMENTS_BEGIN = 'GET_COMMENTS_BEGIN';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE';
export const GET_REPO_DETAILS_BEGIN = 'GET_REPO_DETAILS_BEGIN';
export const GET_REPO_DETAILS_SUCCESS = 'GET_REPO_DETAILS_SUCCESS';
export const GET_REPO_DETAILS_FAILURE = 'GET_REPO_DETAILS_FAILURE';

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
    comments: number
}

export function getIssuesSuccess(issueResponse) {
    return {
      type: GET_ISSUES_SUCCESS,
      payload: {
        pageCount: issueResponse.pageCount,
        pageLinks: issueResponse.pageLinks,
        issues: issueResponse.data,
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
  
export function getIssues(org: string, repo: string, page: number) {
    return dispatch => {
      dispatch({type: GET_ISSUES_BEGIN});
      API.getIssues(org, repo, page)
        .then(res => dispatch(getIssuesSuccess(res)))
        .catch(error => dispatch(getIssuesFailure(error)));
    };
}