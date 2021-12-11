import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const Paginate = (props) => {
    return (
        <View style={styles.container}>
            <Button title="< Prev" onPress={props.onLoadPrevPage} disabled={props.currentPage == 1}></Button>
            <Text style={styles.text}>{props.currentPage} . . . {props.lastPage}</Text>
            <Button title="Next >" onPress={props.onLoadNextPage} disabled={props.currentPage == props.LastPage}></Button>
        </View>
    )
}

export default Paginate

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold'
    }
})
