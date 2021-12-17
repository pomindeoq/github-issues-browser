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
            {labels.map(label => <Button key={label.id}
                                         labelStyle={styles.text} 
                                         style={styles.label} 
                                         compact={true} 
                                         color={`#${label.color}`} 
                                         mode="contained">{label.name}</Button>)}
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
