import React, { useState, useCallback } from 'react'
import { StyleSheet, Linking, View, Text } from 'react-native'
import { userCharge } from '../../api'
import { ButtonCustom } from '../../components/button-custom'
import { Header } from '../../components/header'
import { Input } from '../../components/input'
import { lang, paymentUrl, user } from '../../store'

export const Payment = ({navigation}) => {

    const [paySummary, setPaySummary] = useState('')

    const [checkers, setCheckers] = useState([])

    const [numberCheckers, setNumberCheckers] = useState([])

    const validate = useCallback((index, value) => {
        let bigger = 1000
       if (Number(value) < bigger) {
            setCheckers([...checkers, index])
        } else {
            const tmp = checkers.filter(item => item !== index)
            setCheckers(tmp)
        }
    }, [checkers, paySummary])

    const inputOnchange = useCallback((value, index) => {
        const newValue = value.trim()  
        if (/^\d+$/.test(value) || (value === '')) {
            setPaySummary(newValue)
            validate(1, newValue)
            const tmp = numberCheckers.filter(item => item !== index)
            setNumberCheckers(tmp)
        }
        else {
            if (!(numberCheckers.includes(index))) {
                setNumberCheckers([...numberCheckers, index])
            }
        }        
    }, [paySummary, checkers])

    const handlePay = () => {
        if (paySummary && (checkers.length < 1)) {
            Linking.openURL(`${userCharge}${paymentUrl.value}&userId=${user.data.id}&amount=${paySummary}&_f=json`)
        }
    }

    return (
        <View style = {styles.cont}>
            <Header
                title = {lang.profile.balance.title}
                onPress = {navigation.goBack}
            />
            <View style = {styles.content}>
                <View style = {styles.inputCont}>
                    <Text style = {styles.title}>ID: {user.data.id}</Text>
                    <Input
                        index = {1}
                        value = {paySummary}
                        keyboardType = 'numeric'
                        validate = {validate}
                        onChange = {inputOnchange}
                        minSymb = {lang.formWarnings.minSymbQuant33}
                        checkers = {checkers}
                        numberCheckers = {numberCheckers}
                        placeholder = {lang.profile.balance.summary}
                    />
                    <View style = {styles.buttonCont}>
                        <ButtonCustom
                            title = {lang.profile.balance.pay}
                            onPress = {handlePay}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cont: {
        padding: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    content: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        
    },
    inputCont: {
        width: '100%',
        alignItems: 'center',   
    },
    buttonCont: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        
    }
})