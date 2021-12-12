import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getIssues, Issue } from '../redux/actions';
import IssueListItem from '../components/IssueListItem';
import Paginate from '../components/Paginate';
//import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const IssuesScreen = props => {
    const dispatch = useDispatch();
    
    const repo = props.route.params.repo;
    const org = props.route.params.org;
    const title = props.route.params.title;
    console.log(org);
    
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

    const selectItemHandler = (issue: Issue) => {
      props.navigation.navigate('IssueDetails', {
        title: issue.title,
        state: issue.state,
        number: issue.number,
        user: issue.user,
        labels : issue.labels,
        body: issue.body,
        comments: issue.comments
      });
    };

    const loadPrevPage = () => {
      const currentPage = pageLinks.next.page - 1; 
      if(currentPage != 1) {
        dispatch(getIssues(org, repo, currentPage - 1)); 
      } else {
        console.log("First page")
      }
    }

    const loadNextPage = () => {
      const nextPage = pageLinks.next.page;
      const lastPage = pageLinks.last.page;
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
            renderItem={itemData => (
            <IssueListItem onSelect={() => {
                           selectItemHandler(itemData.item);}} 
                           issue={itemData.item}/>)}
            keyExtractor={item => item.id}
            ListFooterComponentStyle={styles.footer}
            ListFooterComponent={
            <Paginate onLoadPrevPage={loadPrevPage} 
                      onLoadNextPage={loadNextPage} 
                      currentPage={pageLinks.next.page - 1} 
                      lastPage={pageLinks.last.page}/>}
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
