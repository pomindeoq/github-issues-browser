import React, { useEffect, useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getIssues, searchIssues } from '../redux/actions';
import IssueListItem from '../components/IssueListItem';
import Paginate from '../components/Paginate';
import { Searchbar } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { Issue } from '../models/interfaces';

const IssuesScreen = ({ route, navigation } : any) => {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const repo = route.params.repo;
    const org = route.params.org;
    
    let { currentPageIssues, pageLinks, isLoading, query, error } = useSelector((state) => state.issues);
    
    useEffect(() => {
      dispatch(getIssues(org, repo, 1));
    }, [dispatch]);

    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: route.params.title,
        headerRight: () => (
          <Entypo name="github" size={30} color="black" />
        ),
      });
    }, [navigation]);

    const selectItemHandler = (issue: Issue) : void => {
      navigation.navigate('IssueDetails', {
        title: issue.title,
        state: issue.state,
        number: issue.number,
        user: issue.user,
        labels : issue.labels,
        body: issue.body,
        comments: issue.comments,
        url: issue.url
      });
    };

    const search = () : void => {
      dispatch(searchIssues(org, repo, searchQuery, 1))
    }

    const changeSearch = (query: string) : void => {
      setSearchQuery(query);
    }

    const loadPrevPage = () : void => {
      const currentPage = pageLinks.next.page - 1; 
      if(searchQuery) {
        dispatch(searchIssues(org, repo, searchQuery, currentPage - 1)); 
      } else {
        dispatch(getIssues(org, repo, currentPage - 1)); 
      }
    }

    const loadNextPage = () : void => {
      const nextPage = pageLinks.next.page;
      if(searchQuery) {
        dispatch(searchIssues(org, repo, searchQuery, nextPage)); 
      } else {
        dispatch(getIssues(org, repo, nextPage)); 
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
      <View>
        <Searchbar
          placeholder="Search"
          onChangeText={changeSearch}
          value={searchQuery}
          autoComplete={false}
          onIconPress={search}
        />
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
                    currentPage={pageLinks != null ? pageLinks.next.page - 1 : 1} 
                    lastPage={pageLinks != null ? pageLinks.last.page : 1}/>}
        />
      </View>  
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
    marginBottom: 80
  }
})
