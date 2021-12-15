import { combineReducers, AnyAction } from 'redux';
import {
    GET_ISSUES_BEGIN, GET_ISSUES_SUCCESS, GET_ISSUES_FAILURE, SEARCH_ISSUES_BEGIN, SEARCH_ISSUES_SUCCESS,
  } from './actions';
import { InitialState } from '../models/interfaces'

const initialIssuesState : InitialState = {
    currentPageIssues: [],
    pageLinks: {},
    isLoading: false,
    query: null,
    error: null
};  

export function issuesReducer(state = initialIssuesState, action: AnyAction) {
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
          pageLinks: action.payload.pageLinks,
          currentPageIssues: action.payload.issues,
          isLoading: false,
          query: action.payload.query,
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