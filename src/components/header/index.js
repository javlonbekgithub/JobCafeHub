import React from 'react'
import { StyleSheet, Text, Image, Dimensions } from 'react-native'
import arrow from '../../assets/icons/arrow3.png'
import { Neomorph } from 'react-native-neomorph-shadows'
import Ripple from 'react-native-material-ripple'
import { setError } from '../../store'


const HeaderIn = props => {

    const handleBack = () => {
        setError('')
        props.onPress()
    }

    return (
        <Neomorph
            lightShadowColor = "#FFF" // <- this// <- change zIndex of each shadow color
            darkShadowColor = "#000" // <- set this
            style = {styles.cont}
        >
            <Ripple
                style = {styles.touchable}
                onPress = {handleBack}
                rippleCentered = {true}
            >
                <Image
                    style = {styles.arrow}
                    resizeMode = 'contain'
                    source = { arrow }
                />
            </Ripple>
            <Text style = {styles.title}>{props.title}</Text>
        </Neomorph>
    )
}

export const Header = React.memo(HeaderIn)

const styles = StyleSheet.create({
    cont: {
        shadowOffset: {
            width: 1.2, 
            height: 1.5
        },
        shadowOpacity: 0.1, // <- and this or yours opacity
        shadowRadius: 2,
        borderRadius: 4,
        // zIndex: 655,
        backgroundColor: '#F0F2F6',
        width: Dimensions.get('screen').width - 20,
        height: 60,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 4,
    },
    touchable: {
        paddingHorizontal: 13,
        // backgroundColor: 'red',
        zIndex: 20,
    },
    arrow: {
        // position: 'absolute',
        // position: 'relative',
        width: 20,
    },
    title: {
        fontSize: 16,
        left: -40,
        width: '100%',
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: 'Roboto',
        color: '#21243D',
        lineHeight: 19
    }
})