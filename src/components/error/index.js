import { observer } from 'mobx-react'
import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { error } from '../../store'

export const Error = observer(() => (
    <Text style = {error.value ? styles.error : styles.hide}>{error.value}</Text>
))

const styles = StyleSheet.create({
    error: {
        paddingHorizontal: 30,
        color: 'red',
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginVertical: 10
    },
    hide: {
        display: 'none'
    }
})