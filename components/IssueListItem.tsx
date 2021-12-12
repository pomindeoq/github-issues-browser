import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import UserAvatar from './UserAvatar'
import shorten from '../utils/stringUtils'

const IssueListItem = ({ issue, onSelect }) => {

    return (
        <TouchableOpacity onPress={onSelect}>
            <View style={styles.issue}>
                <View style={styles.titleContainer}>
                    <Text style={styles.number}>#{issue.number}</Text>
                    <Text style={styles.title}>{issue.title}</Text>
                </View>
                <View style={styles.avatarContainer}>
                    <UserAvatar user={issue.user}/>
                    <Text style={styles.body}>{shorten(issue.body)}</Text>
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
        fontSize: 14,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        marginLeft: 7
    },
    number: {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'grey',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        maxWidth: 250
    },
    avatarContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        maxWidth: 250
    },
    body : {
        fontSize: 13,
        padding: 5
    }
})
