import { Action, combineReducers } from 'redux';
import {
    GET_ISSUES_BEGIN, GET_ISSUES_SUCCESS, GET_ISSUES_FAILURE, SEARCH_ISSUES_BEGIN, SEARCH_ISSUES_SUCCESS,
  } from './actions';

const initialIssuesState = {
    currentPageIssues: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null
};  

export function issuesReducer(state = initialIssuesState, action: Action) {
    switch(action.type) {
      case SEARCH_ISSUES_BEGIN:
      case GET_ISSUES_BEGIN:
        return {
          ...state,
          isLoading: true
        };
      case GET_ISSUES_SUCCESS:
      case SEARCH_ISSUES_SUCCESS:  
        return {
          ...state,
          pageCount: action.payload.pageCount,
          pageLinks: action.payload.pageLinks,
          currentPageIssues: action.payload.issues,
          isLoading: false,
          error: null
        };
      case GET_ISSUES_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.error
        };
      default:
        return state;
     }
}

export default combineReducers({
    issues: issuesReducer,
});