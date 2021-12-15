import { Dispatch } from 'redux';
import * as API from '../api/issuesAPI';
import { ApiResponse } from '../models/interfaces';

export const SEARCH_ISSUES_BEGIN = 'SEARCH_ISSUES_BEGIN';
export const SEARCH_ISSUES_SUCCESS = 'SEARCH_ISSUES_SUCCESS';
export const SEARCH_ISSUES_FAILURE = 'SEARCH_ISSUES_FAILURE';
export const GET_ISSUES_BEGIN = 'GET_ISSUES_BEGIN';
export const GET_ISSUES_SUCCESS = 'GET_ISSUES_SUCCESS';
export const GET_ISSUES_FAILURE = 'GET_ISSUES_FAILURE';

export function getIssuesSuccess(issueResponse: ApiResponse) {
  return {
    type: GET_ISSUES_SUCCESS,
    payload: {
      pageLinks: issueResponse.pageLinks,
      issues: issueResponse.data.items,
      loading: false
    }
  };
}

export function searchIssuesSuccess(issueResponse : ApiResponse, query: string) {
  return {
    type: SEARCH_ISSUES_SUCCESS,
    payload: {
      pageLinks: issueResponse.pageLinks,
      issues: issueResponse.data.items,
      loading: false,
      query
    }
  };
}
  
export function getIssuesFailure(error: Error){
  return {
      type: GET_ISSUES_FAILURE,
      error
    };
  }

export function searchIssues(org: string, repo: string, query: string, page: number) {
  return (dispatch : Dispatch) => {
    dispatch({type: SEARCH_ISSUES_BEGIN});
    API.searchIssues(org, repo, query, page)
      .then(res => dispatch(searchIssuesSuccess(res, query)))
      .catch(error => dispatch(getIssuesFailure(error)));
  };
}
  
export function getIssues(org: string, repo: string, page: number) {
  return (dispatch : Dispatch) => {
    dispatch({type: GET_ISSUES_BEGIN});
    API.getIssues(org, repo, page)
      .then(res => dispatch(getIssuesSuccess(res)))
      .catch(error => dispatch(getIssuesFailure(error)));
  };
}