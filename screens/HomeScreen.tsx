import React, { Props, useState } from 'react'
import { StyleSheet, Text, View, TextInput, SafeAreaView, Button } from 'react-native'

const homeScreen = ({ navigation }) => {
    const [currentOrg, setCurrentOrg] = useState('');
    const [currentRepo, setCurrentRepo] = useState('');
    const title = `${currentOrg} / ${currentRepo}`;

    type ChangeHandler = (text: string) => void

    const onOrgChanged: ChangeHandler = (text: string) => {
        setCurrentOrg(text)
      }
    
    const onRepoChanged: ChangeHandler = (text: string) => {
        setCurrentRepo(text)
    }
    
    return (
        <View style={styles.container} >
            <TextInput 
                style={styles.input} 
                onChangeText={onOrgChanged} 
                value={currentOrg} 
                placeholder="Enter org"
                autoFocus={true}
            />
            <TextInput
                style={styles.input}
                onChangeText={onRepoChanged}
                value={currentRepo} 
                placeholder="Enter repo"
                autoFocus={true}
            />
            <Button
                onPress={() => { navigation.navigate('Issues', {org: currentOrg, repo: currentRepo, title: title }) } }
                title="Load issues"
                color="#841584"
            />
        </View>
    )
}

export default homeScreen

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    container: {
        flex: 1,
        justifyContent: 'center',
    }  
})



