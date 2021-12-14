import { Links } from "parse-link-header"
import { ReducerAction } from "react";

export interface Label {
    id: string
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
    state: 'open' | 'closed'
    comments: number,
    url: string
}

export interface GithubApiResponse {
    total_count : number,
    incomplete_results: boolean,
    items : Issue[]
}

export interface ApiResponse {
    pageLinks: Links | null,
    data: GithubApiResponse,
}

export interface Action {
    type: string,
    payload : {
        pageLinks : Links | null,
        issues : Issue[],
        isLoading : boolean,
        query: string | null
    },
    error: Error | null 
}

export interface InitialState {
    currentPageIssues: Issue[],
    pageLinks: Links | null,
    isLoading: boolean,
    error: Error | null,
    query: string | null
}