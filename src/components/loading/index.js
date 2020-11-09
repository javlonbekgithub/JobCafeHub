import React from 'react'
import { lang } from '../../store'
import loadingImg from '../../assets/img/loading.gif'
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'

export const Loading = () => (
    <View style = {styles.cont}>
        <Image
            style = {styles.img}
            resizeMode = 'contain'
            source = {loadingImg}
        />
        <Text style = {styles.loading}>{lang.loading}</Text>
    </View>
)

const styles = StyleSheet.create({
    cont: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 2222,
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0,
    },
    img: {
        width: 50,
        height: 50,
    },
    loading: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical: 'center',  
    }
})