import React, { useState } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';

const homeScreen = ({ navigation } : any) => {
    const [currentOrg, setCurrentOrg] = useState<string>('');
    const [currentRepo, setCurrentRepo] = useState<string>('');
    const title : string = `${currentOrg} / ${currentRepo}`;

    type ChangeHandler = (text: string) => void

    const onOrgChanged: ChangeHandler = (text: string) => {
        setCurrentOrg(text);
      }
    
    const onRepoChanged: ChangeHandler = (text: string) => {
        setCurrentRepo(text);
    }

    const onPressHandler = () : void => {
        if (!currentOrg.trim()) {
            alert('Please Enter organization');
            return;
        }
        if (!currentRepo.trim()) {
            alert('Please Enter repository');
            return;
        }
        navigation.navigate('Issues', {org: currentOrg, repo: currentRepo, title: title });
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <AntDesign name="github" size={40} color="black" />
            </View>
            <View style={styles.inputs} >
                <TextInput 
                    onChangeText={onOrgChanged} 
                    value={currentOrg} 
                    label="organization"
                    mode="flat"
                    placeholder="enter org"
                    autoComplete={false}
                    style={styles.input}
                    autoCapitalize='none'
                />
                <TextInput
                    onChangeText={onRepoChanged}
                    value={currentRepo} 
                    label="repository"
                    mode="flat"
                    placeholder="enter repo"
                    autoComplete={false}
                    style={styles.input}
                    autoCapitalize='none'
                />
                <Button
                    onPress={onPressHandler}
                    title="Load issues"
                    color="#6200ee"
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
        height: 60,
        margin: 12,
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



