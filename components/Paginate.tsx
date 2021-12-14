import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
interface PaginateProps {
    onLoadPrevPage: () => void,
    onLoadNextPage: () => void,
    currentPage : number,
    lastPage: number
}

const Paginate = ({ onLoadPrevPage, onLoadNextPage, currentPage, lastPage } : PaginateProps) => {
    return (
        <View style={styles.container}>
            <Button title="< Prev" onPress={onLoadPrevPage} disabled={currentPage == 1}></Button>
            <Text style={styles.text}>{currentPage} of {lastPage} pages</Text>
            <Button title="Next >" onPress={onLoadNextPage} disabled={currentPage == lastPage}></Button>
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
