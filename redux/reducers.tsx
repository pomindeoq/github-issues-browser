import { Action, combineReducers } from 'redux';
import {
    GET_ISSUE_BEGIN, GET_ISSUE_SUCCESS, GET_ISSUE_FAILURE,
    GET_ISSUES_BEGIN, GET_ISSUES_SUCCESS, GET_ISSUES_FAILURE,
    GET_COMMENTS_BEGIN, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE,
    GET_REPO_DETAILS_BEGIN, GET_REPO_DETAILS_SUCCESS, GET_REPO_DETAILS_FAILURE,
  } from './actions';

const initialIssuesState = {
    //issuesByNumber: {},
    currentPageIssues: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null
};  

export function issuesReducer(state = initialIssuesState, action: Action) {
    switch(action.type) {
      case GET_ISSUE_BEGIN:
      case GET_ISSUES_BEGIN:
        return {
          ...state,
          isLoading: true
        };
    //   case GET_ISSUE_SUCCESS:
    //     return {
    //       ...state,
    //       issuesByNumber: {
    //         ...state.issuesByNumber,
    //         [action.payload.number]: action.payload
    //       },
    //       isLoading: false,
    //       error: null
    //     };
      case GET_ISSUES_SUCCESS:
        return {
          ...state,
          pageCount: action.payload.pageCount,
          pageLinks: action.payload.pageLinks,
          // issuesByNumber: action.payload.issues.reduce((result, issue) => {
          //   result[issue.number] = issue;
          //   return result;
          // }, {}),
          currentPageIssues: action.payload.issues,
          isLoading: false,
          error: null
        };
      case GET_ISSUE_FAILURE:
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
  
// const initialRepoState = {
//     openIssuesCount: -1,
//     error: null
// };


export default combineReducers({
    issues: issuesReducer,
});