import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type NestedScreenProps = {
    route: {
        params: {
            msg: string
        }
    }
}

const NestedScreen = ({ route }: NestedScreenProps) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>{route.params.msg}</Text>
        </View>
    )
}

export default NestedScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000025',
    },
    text: {
        color: '#000',
        fontWeight: '700',
        fontSize: 30
    },
})