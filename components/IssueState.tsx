import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper';
interface IssueStateProps {
    state: 'open' | 'closed'
}

const IssueState = ({ state } : IssueStateProps) => {
    const color = state === 'open' ? 'green' : 'red';
    return (
        <View>
            <Button color={color} mode="text">
                {state}
            </Button>            
        </View>
    )
}

export default IssueState

const styles = StyleSheet.create({})
