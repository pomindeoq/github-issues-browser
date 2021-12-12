import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import UserAvatar from '../components/UserAvatar';
import IssueState from '../components/IssueState'

const IssueDetailsScreen = (props) => {
    const {title, state, number, user, labels, body, comments} = props.route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={true}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{title}</Text>
                    </View>    
                    <View style={styles.infoContainer}>
                        <Text style={styles.number}>#{number}</Text>
                        <IssueState state={state}/>
                        <UserAvatar user={user}/>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.body}>{body}</Text>
                    </View>
            </ScrollView>  
        </SafeAreaView>             
    )
}

export default IssueDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
        paddingBottom: 0
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10
    },
    number: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'grey'
    },
    descriptionContainer: {
        fontSize: 14,
        padding: 10,
        borderColor:'grey',
        borderBottomWidth:1,
    },
    body: {
        padding: 5,
        fontSize: 14,
    }
})
