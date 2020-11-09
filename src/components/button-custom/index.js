import React, { useState } from 'react'
import { Text, StyleSheet, Dimensions, TouchableHighlight } from 'react-native'
import { Neomorph } from 'react-native-neomorph-shadows'


const ButtonCustomIn = props => {

    var [ isPress, setIsPress ] = useState(false);

    var touchProps = {
        activeOpacity: 1,
        underlayColor: '#00000000',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
        style: styles.btnNormal, // <-- but you can still apply other style changes
        onHideUnderlay: () => setIsPress(false),
        onShowUnderlay: () => setIsPress(true),
        onPress: () => props.onPress(),                 // <-- "onPress" is apparently required
    };
    
    let button = styles.shadow

    if(props.drawer) button = {...button, ...styles.drawerButton}
    
    if(props.circle) button = {...button, ...styles.circleButton}

    if(props.miniInfo) button = {...button, ...styles.miniInfo}

    if(props.call)  {
        button = {...button, ...styles.miniInfo, ...styles.call}
        // styles.text.color = '#fff'
    }


    // const active = param => {
    //     // param ? setPressed(param) : setPressed(props.active) 
    //     props.onPress()
    // }

    return (
        <>
            {props.active || isPress ? 
                <Neomorph
                    inner
                    lightShadowColor = "#fff0f0" // <- this// <- change zIndex of each shadow color
                    darkShadowColor = "#000" // <- set this
                    style = {{...button, ...styles.withOutBorder, ...styles.borderVisible}}
                >
                    <TouchableHighlight {...touchProps}>
                        <Text></Text>
                    </TouchableHighlight>
                    <Text
                        onPress = {props.onPress}
                        style = {{...styles.button, ...props.helperStyle, ...styles.text}}
                    >
                        {props.title}
                    </Text>
                </Neomorph>
             : <Neomorph
                    lightShadowColor = "#FFF" // <- this// <- change zIndex of each shadow color
                    darkShadowColor = "#000" // <- set this
                    style = {button}
                >
                    <TouchableHighlight {...touchProps}>
                        <Text></Text>
                    </TouchableHighlight>
                    <Text
                        onPress = {props.onPress}
                        style = {props.call ? {...styles.text, color: '#fff'}: styles.text}
                        // style = {props.helperStyle}
                    >
                        {props.title}
                    </Text>
            </Neomorph>}
        </>
    )
}

export const ButtonCustom = React.memo(ButtonCustomIn)

const styles = StyleSheet.create({
    shadow: {
        width: Dimensions.get('screen').width / 2 - 15,
        height: 55,
        position: 'relative',
        shadowOffset: {
            width: 1.2, 
            height: 1.5
        },
        shadowOpacity: 0.15, // <- and this or yours opacity
        shadowRadius: 2,
        borderRadius: 4,
        borderRadius: 4,
        alignItems: 'center',
        backgroundColor: '#F0F2F6',
        borderWidth: 1,
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderColor: '#ffffff',
        borderRadius: 4,
    },
    withOutBorder: {
        borderColor: 'transparent'
    },
    button: {
        alignSelf: 'center',
        flex: 1,
        width: Dimensions.get('screen').width / 2 - 15,
        height: 55,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'transparent',
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        alignItems: 'center',
        color: '#000',
    },
    borderVisible: {
        borderColor: '#ffffff80',
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderTopColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomWidth: 2,
        borderRightWidth: 2
    },
    pressedButton: {
        elevation: 0,
        // backgroundColor: 'transparent'
    },
    drawerButton: {
        // paddingTop: 28,
    //  paddingVertical: 50,
        // lineHeight: 15,
        height: 55,
        borderColor: '#fff',
        alignItems: 'center',
        borderWidth: 1,
        width: 125,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    circleButton: {
        borderRadius: 50,
        alignSelf: 'center',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ECF0F3',
        width: 80,
        height: 80,
        // paddingTop: 20,
        // paddingBottom: 20,
        // paddingLeft: 20,
        // paddingRight: 20,
        marginBottom: 10,
    },
    miniInfo: {
        height: 55,
        borderColor: '#fff',
        alignItems: 'center',
        borderWidth: 1,
        width: 150,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    call: {
        backgroundColor: '#50D890',
    },
    text: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#21243D'
    },
    btnNormal: {
        // borderColor: 'blue',
        // borderWidth: 1,
        zIndex: 222,
        position: 'absolute',
        top: 0,
        left: 0,
        // backgroundColor: 'red',
        height: '100%',
        width: '100%',
    }
})