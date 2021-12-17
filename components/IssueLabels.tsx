import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Label } from '../models/interfaces';
interface IssueLabelsProps {
    labels: Label[]
}

const IssueLabels = ({ labels } : IssueLabelsProps) => {

    return (
        <View style={styles.list}>
            {labels.map(item => <Button key={item.id}
                                        labelStyle={styles.text} 
                                        style={styles.label} 
                                        compact={true} 
                                        color={`#${item.color}`} 
                                        mode="contained">{item.name}</Button>)}
        </View>
    )
}

export default IssueLabels

const styles = StyleSheet.create({
    label: {
        marginRight: 5
    },
    list: {
        flexDirection: 'row'
    },
    text: {
        fontSize: 8
    }
})
