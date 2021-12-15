import { issuesReducer } from '../redux/reducers'
import {
  GET_ISSUES_BEGIN, GET_ISSUES_SUCCESS, GET_ISSUES_FAILURE,
} from '../redux/actions';

describe('issuesReducer', () => {

  describe('getting multiple issues', () => {
    const initialState = {
        currentPageIssues: [],
        pageLinks: {},
        isLoading: false,
        query: null,
        error: null
    }
    
    const BEGIN_ACTION = {
        type: GET_ISSUES_BEGIN,      
        isLoading : true,
    }

    const SUCCESS_ACTION_EMPTY = {
        type: GET_ISSUES_SUCCESS,
        payload : {
            pageLinks : {},
            issues : [],
            isLoading : false,
            query: null
        },
        error: null 
    }

    const SUCCESS_ACTION = {
        type: GET_ISSUES_SUCCESS,
        payload : {
            pageLinks : {next: {}},
            issues : [1, 2],
            isLoading : false,
            query: null
        },
        error: null 
    }

    const FAILURE_ACTION = {
        type: GET_ISSUES_FAILURE,
        isLoading : false,
        error: new Error('error')
    }

    it('has initial state', () => {
      expect(issuesReducer(undefined, SUCCESS_ACTION_EMPTY)).toEqual({
        currentPageIssues: [],
        pageLinks: {},
        isLoading: false,
        query: null,
        error: null
      });
    });

    it('handles BEGIN', () => {
      expect(issuesReducer(initialState, BEGIN_ACTION)).toEqual({
        currentPageIssues: [],
        pageLinks: {},
        isLoading: true,
        query: null,
        error: null
      });
    });

    it('handles FAILURE', () => {
      expect(issuesReducer(initialState, FAILURE_ACTION)).toEqual({
        currentPageIssues: [],
        pageLinks: {},
        isLoading: false,
        query: null,
        error: new Error('error')
      });
    });

    it('handles SUCCESS with issues', () => {

      expect(issuesReducer(initialState, SUCCESS_ACTION)).toEqual({
        currentPageIssues: [1, 2],
        pageLinks: {next: {}},
        isLoading: false,
        query: null,
        error: null,
      });
    });

    it('handles SUCCESS with empty issues', () => {

      expect(issuesReducer(initialState, SUCCESS_ACTION_EMPTY)).toEqual({
        currentPageIssues: [],
        pageLinks: {},
        isLoading: false,
        query: null,
        error: null,
      });
    });
  });
});