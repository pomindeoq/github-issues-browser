import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IssueDetailsScreen from '../screens/IssueDetailsScreen';
import IssuesScreen from '../screens/IssuesScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Enter repo to load' }}/>
            <Stack.Screen name="Issues" component={IssuesScreen} options={({ route }) => ({ title: route.params.title })}/>
            <Stack.Screen name="IssueDetails" component={IssueDetailsScreen} />
        </Stack.Navigator>
    )
}

export default StackNavigator
