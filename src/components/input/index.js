import React from 'react'
import { Animated, StyleSheet, Text, TextInput, View } from 'react-native'
import InsetShadow from 'react-native-inset-shadow'
import { lang } from './../../store/index';


const InputIn = props => {
    
    const handleFocus = () => props.onFocus && props.onFocus()

    const handleBlur = () => props.validate(props.index, props.value)

    const handleOnChange = e => props.onChange(e.nativeEvent.text, props.index)
    

    return (
        <View style = {styles.cont}>
            <Animated.Text 
                style = {!props.value ? 
                    { ...styles.hide}: 
                    {...styles.placeholder}}
            >
                {props.placeholder}
            </Animated.Text>
            <InsetShadow
                bottom = {false}
                right = {false}
                shadowRadius = {500}
                elevation = {2.8}
                containerStyle = {styles.inputCont}
            >
                <TextInput
                    keyboardType = {props.keyboardType && props.keyboardType}
                    autoCapitalize = 'none'
                    onBlur = {handleBlur}
                    style = {styles.input}
                    placeholder = {props.placeholder}
                    onChange = {handleOnChange}
                    secureTextEntry = {props.secureTextEntry && true}
                    onFocus = {handleFocus}
                    value = {props.value}
                />
            </InsetShadow>
            {(props.alphaCheckers && (props.alphaCheckers.includes(props.index))) &&<Text
                style = {styles.incorrect}   
            >
                {lang.formWarnings.onlyLetters}
            </Text>}
            {(props.numberCheckers && (props.numberCheckers.includes(props.index))) &&<Text
                style = {styles.incorrect}   
            >
                {lang.formWarnings.onlyNumbers}
            </Text>}
            <Text
                style = {props.checkers.includes(props.index) ? styles.incorrect : styles.transparent}   
            >
                {`${lang.formWarnings.min} ${props.minSymb} ${props.numberCheckers ? lang.formWarnings.sum : lang.formWarnings.symb}`}
            </Text>
        </View>
)}

export const Input = React.memo(InputIn)

const styles = StyleSheet.create({
    cont: {
        width: "80%",
    },
    inputCont: {
        width: '100%',
        height: 'auto',
        borderRadius: 4,
        marginVertical: 10
    },
    placeholder: {
        position: 'absolute',
        top: -1,
        left: 10,
        color: '#00000050',
        zIndex: 22222,
        backgroundColor: '#F0F2F6',
        padding: 2,
    },
    input: {
        fontSize: 16,
        backgroundColor: '#F0F2F6',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 4,
        width: '100%',
        padding: 10
    },
    incorrect: {
        color: 'red',
        marginBottom: 2,
        alignSelf: 'flex-start', 
    },
    hide: {
        display: 'none'
    },
    transparent: {
        color: 'transparent'
    },
})