import React from 'react'
import { Neomorph } from 'react-native-neomorph-shadows'
import profile from '../../assets/logo/profileCont.png'
import { Image, StyleSheet } from 'react-native'

const EllipseIn = props => {

    return (
        <Neomorph
            lightShadowColor = "#FFF" // <- this// <- change zIndex of each shadow color
            darkShadowColor = "#000" // <- set this
            style = {styles.profileEllipse}
        >
            <Image
                style = {!(props.signed && props.image) ? styles.profile : styles.ava} 
                resizeMode = {!(props.signed && props.image) ? 'contain' : 'cover'}
                source = { !(props.image) ? profile : {
                    uri: props.image
                } }
            />
        </Neomorph>
    )
}

export const Ellipse = React.memo(EllipseIn)

const styles = StyleSheet.create({
    profileEllipse: {
        width: 150,
        height: 150,
        position: 'relative',
        shadowOpacity: 0.18, // <- and this or yours opacity
        shadowRadius: 6,
        borderRadius: 4,
        backgroundColor: '#ECF0F3',
        borderWidth: 2,
        borderColor: '#ffffff',
        justifyContent: 'center',
        marginBottom: 20,
        alignItems: 'center',
        borderRadius: 100,
        overflow: 'hidden'
    },
    profile: {
        height: 50,
        width: 50,
    },
    ava: {
        height: 140,
        width: 140,
        borderRadius: 100
    },
})