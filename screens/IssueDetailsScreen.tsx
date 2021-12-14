import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import UserAvatar from '../components/UserAvatar'
import IssueState from '../components/IssueState'
import { AntDesign } from '@expo/vector-icons';
import { Linking } from 'react-native';


const IssueDetailsScreen = (props : any) => {
    const {title, state, number, user, labels, body, comments, url} = props.route.params;
    const headerTitle = `Issue #${number}`;

    useLayoutEffect(() => {
        props.navigation.setOptions({
          headerTitle: headerTitle,
        });
      }, [props.navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={true}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{title}</Text>
                    </View>    
                    <View style={styles.infoContainer}>
                        <AntDesign name="github" size={30} color="black" onPress={() => Linking.openURL(url)}/>
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
    },
    body: {
        padding: 5,
        fontSize: 14,
    }
})
