import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IssueDetailsScreen from '../screens/IssueDetailsScreen';
import IssuesScreen from '../screens/IssuesScreen';
import HomeScreen from '../screens/HomeScreen';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Button } from 'react-native'

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Enter repo to load' }}/>
            <Stack.Screen name="Issues" component={IssuesScreen} />
            <Stack.Screen name="IssueDetails" component={IssueDetailsScreen} />
        </Stack.Navigator>
    )
}

export default StackNavigator
