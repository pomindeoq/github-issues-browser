import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import UserAvatar from './UserAvatar'
import IssueState from './IssueState';
import IssueLabels from './IssueLabels';
import { Issue } from '../models/interfaces';
interface IssueListItemProps {
    issue: Issue,
    onSelect: () => void
}

const IssueListItem = ({ issue, onSelect } : IssueListItemProps) => {
    const commentsString = issue.comments === 1 ? 'comment' : 'comments'

    return (
        <TouchableOpacity onPress={onSelect}>
            <View style={styles.issue}>
                <View style={styles.titleContainer}>
                    <Text style={styles.number}>#{issue.number}</Text>
                    <Text style={styles.title}>{issue.title}</Text>
                </View>
                <View style={styles.avatarContainer}>
                    <UserAvatar user={issue.user}/>
                    <IssueState state={issue.state}/>
                    <Text>({issue.comments} {commentsString})</Text>
                </View>
                <View style={styles.labelsContainer}>
                    <IssueLabels labels={issue.labels}/>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default IssueListItem

const styles = StyleSheet.create({
    issue: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        height: 200,
        borderColor:'grey',
        borderBottomWidth:1,
      },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        marginLeft: 7
    },
    number: {
        fontWeight: 'bold',
        fontSize: 11,
        color: 'grey',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 290
    },
    avatarContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    labelsContainer: {
        marginTop: 10
    },
    body : {
        fontSize: 13,
        padding: 5
    },
})
