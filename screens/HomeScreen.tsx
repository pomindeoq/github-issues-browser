import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const homeScreen = ({ navigation } : any) => {
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
        <View style={styles.container}>
            <View style={styles.logo}>
                <AntDesign name="github" size={40} color="black" />
            </View>
            <View style={styles.inputs} >
                <TextInput 
                    style={styles.input} 
                    onChangeText={onOrgChanged} 
                    value={currentOrg} 
                    placeholder="Enter organization"
                    autoFocus={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onRepoChanged}
                    value={currentRepo} 
                    placeholder="Enter repository"
                    autoFocus={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Button
                    onPress={() => { navigation.navigate('Issues', {org: currentOrg, repo: currentRepo, title: title }) } }
                    title="Load issues"
                    color="#841584"
                />
            </View>
        </View>    
    )
}

export default homeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    inputs: {
        flex: 3,
        justifyContent: 'flex-start',
    },
    logo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }  
})



