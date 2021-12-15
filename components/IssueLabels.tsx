import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { Label } from '../models/interfaces';
interface IssueLabelsProps {
    labels: Label[]
}

const IssueLabels = ({ labels } : IssueLabelsProps) => {

    return (
        <View>
            <FlatList
                style={styles.list}
                data={labels}
                renderItem={ ({item}) => ( <Button labelStyle={styles.text} 
                                                   style={styles.label} 
                                                   compact={true} 
                                                   color={`#${item.color}`} 
                                                   mode="outlined">{item.name}</Button> )}
                keyExtractor={item => item.id}
            />
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
