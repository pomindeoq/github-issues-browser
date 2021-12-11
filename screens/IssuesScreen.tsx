import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getIssues, Issue } from '../redux/actions';
import IssueListItem from '../components/IssueListItem';
import Paginate from '../components/Paginate';

const IssuesScreen = props => {
    const dispatch = useDispatch();
    
    const repo = props.route.params.repo;
    const org = props.route.params.org;
    
    let {currentPageIssues, pageCount, pageLinks, isLoading, error } = useSelector(state => state.issues);

    const loadIssues = useCallback(async () => {
        try {
          await dispatch(getIssues(org, repo, 1));
        } catch (err) {
          
        }
    }, [dispatch]);
    
    useEffect(() => {
        loadIssues().then(() => {
          
        });
    }, [dispatch, loadIssues, repo, org]);


    const loadPrevPage = () => {
      let currentPage = pageLinks.next.page - 1; 
      console.log(currentPage);
      if(currentPage != 1) {
        dispatch(getIssues(org, repo, currentPage - 1)); 
      } else {
        console.log("First page")
      }
    }

    const loadNextPage = () => {
      let nextPage = pageLinks.next.page;
      let lastPage = pageLinks.last.page;
      console.log(nextPage);
      console.log(lastPage);
      if(nextPage -1 != lastPage) {
        dispatch(getIssues(org, repo, nextPage)); 
      } else {
       console.log("This is last page")
      }
    }

    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }

    if (!isLoading && currentPageIssues.length === 0) {
      return (
        <View style={styles.container}>
          <Text>No issues found!</Text>
          <Text>{error}</Text>
        </View>
      );
    }

    return (
        <FlatList
            data={currentPageIssues}
            renderItem={ ItemData => (<IssueListItem issue={ItemData.item}/>)}
            keyExtractor={item => item.id}
            ListFooterComponentStyle={styles.footer}
            ListFooterComponent={ <Paginate onLoadPrevPage={loadPrevPage} 
                                            onLoadNextPage={loadNextPage} 
                                            currentPage={pageLinks.next.page - 1} 
                                            lastPage={pageLinks.last.page}/> }
        />
    )
}

export default IssuesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    footer : {
      flex:1, 
      justifyContent: 'flex-end', 
      marginBottom: 30
    }
})
