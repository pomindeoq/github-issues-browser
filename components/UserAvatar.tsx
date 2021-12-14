import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { User } from '../models/interfaces';

interface UserAvatarProps {
    user: User
}

const UserAvatar = ({ user } : UserAvatarProps) => {
    return (
        <View style={styles.avatarContainer}>
            <Image style={styles.image} source={{ uri: user.avatar_url}}/>
            <Text style={styles.userName}>{user.login}</Text>
        </View>
    )
}

export default UserAvatar

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow: 'hidden'
    },
    userName: {
        fontSize: 10,
        color: 'grey'
    }, 
    avatarContainer: {
        padding: 5,
        paddingLeft: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }  
})
