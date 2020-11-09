import React, { useCallback, useState } from 'react'
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native'
import { Header } from '../../components/header'
import { Input } from '../../components/input'
import { lang, setError, setUser } from '../../store'
import { ButtonCustom } from './../../components/button-custom'
import { Loading } from '../../components/loading'
import { observer } from 'mobx-react'
import { Api, signUpApi } from '../../api'
import { Error } from '../../components/error'
import { regexOnlyLetters, regexOnlyNumbers, regexSpace } from '../../helper-functions'


const RegistrationJobGiverIn = observer(({navigation}) => {

    const [first_name, setName] = useState('')

    const [last_name, setSurname] = useState('')

    const [middle_name, setMiddleName] = useState('')

    const [password, setPassword] = useState('')

    const [password_confirm, setPassword_confirm] = useState('')

    const [phone, setNumberPhone] = useState('')

    const [checkers, setCheckers] = useState([])

    const [alphaCheckers, setAlphaCheckers] = useState([])

    const [numberCheckers, setNumberCheckers] = useState([])

    const [loading, setLoading] = useState(false)

    const handleFocus = () => {
        if (phone === '') {
            setNumberPhone('+998')
        }
    }

    const validate = useCallback((index, value) => {
        let bigger
        if (index === 3) {
            bigger = 12
        } else if (index === 4 || index === 5) {
            bigger = 6
        } else {
            bigger = 4
        }
        if (value.length < bigger) {
            setCheckers([...checkers, index])
        } else {
            const tmp = checkers.filter(item => item !== index)
            setCheckers(tmp)
        }
    }, [checkers])

    const inputOnchange = useCallback((value, index) => {
        console.log(value, index)
        const newValue = value.replace(regexSpace, '')         
        if (index === 0) {
            if (regexOnlyLetters.test(value) || (value === '')) {
                setName(newValue)
                const tmp = alphaCheckers.filter(item => item !== index)
                setAlphaCheckers(tmp)
            }
            else {
                if (!(alphaCheckers.includes(index))) {
                    setAlphaCheckers([...alphaCheckers, index])
                }
            } 
        }
        if (index === 1) {
            if (regexOnlyLetters.test(value) || (value === '')) {
                setSurname(newValue)
                const tmp = alphaCheckers.filter(item => item !== index)
                setAlphaCheckers(tmp)
            }
            else {
                if (!(alphaCheckers.includes(index))) {
                    setAlphaCheckers([...alphaCheckers, index])
                }
            }
        }
        if (index === 2) {
            if (regexOnlyLetters.test(value) || (value === '')) {
                setMiddleName(newValue)
                const tmp = alphaCheckers.filter(item => item !== index)
                setAlphaCheckers(tmp)
            }
            else {
                if (!(alphaCheckers.includes(index))) {
                    setAlphaCheckers([...alphaCheckers, index])
                }
            }
        }
        if (index === 3) {
            if (value.length >= 4) {
                if (regexOnlyNumbers.test(value.slice(1)) || (value === '')) {
                    setNumberPhone(newValue)
                    const tmp = numberCheckers.filter(item => item !== index)
                    setNumberCheckers(tmp)
                }
                else {
                    if (!(numberCheckers.includes(index))) {
                        setNumberCheckers([...numberCheckers, index])
                    }
                }
            }
        }
        if (index === 4) {
            setPassword(newValue)
        }
        if (index === 5) {
            setPassword_confirm(newValue)
        }
    }, [])

    const generalValidate = () => {
        let newCheckers = [...checkers]
        if (!first_name) {
            newCheckers = [...newCheckers, 0]
        }
        if (!last_name) {
            newCheckers = [...newCheckers, 1]
        }
        if (!middle_name) {
            newCheckers = [...newCheckers, 2]
        }
        if (phone.length < 4) {
            newCheckers = [...newCheckers, 3]
        }
        if (!password) {
            newCheckers = [...newCheckers, 4]
        }
        if (!password_confirm) {
            newCheckers = [...newCheckers, 5]
        }
        setCheckers(newCheckers)
    }

    const next = async() => {
        if (first_name && last_name &&  middle_name && phone && password && password_confirm && (checkers.length < 1)) {
            if (password === password_confirm) {
                var formdata = new FormData()
                formdata.append("phone", phone)
                formdata.append("password", password)
                formdata.append("password_confirm", password_confirm)
                formdata.append("first_name", first_name)
                formdata.append("last_name", last_name)
                formdata.append("middle_name", middle_name)
                formdata.append("type", "2")

                try {
                    setLoading(true)
                    let res = await Api(signUpApi, formdata, 'post')
                    console.log(JSON.stringify(res,null,2))
                    setError('')
                    if (res.code === 1) {
                        setError('')
                        setLoading(false)
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        })
                        navigation.openDrawer()
                    } else {
                        setLoading(false)
                        if (res.errors) 
                            setError(Object.values(res.errors).toString())
                        else
                            setError(res.message.toString())
                    }
                } catch(err) {
                    setLoading(false)
                    console.log(err)
                }

            } else {
                setLoading(false)
                setError(lang.formWarnings.passwordDontMatches)
            }
        }
        else 
            generalValidate()
    }

    return (
        <View style = {styles.cont}>
            <Header
                title = {lang.registration.title}
                onPress = {navigation.goBack}
            />
            {loading && <Loading/>}
            <ScrollView
                contentContainerStyle={styles.scrollViewCont}
                centerContent = {true}
            >
                <View style = {styles.textCont}>
                    <Text style = {styles.textTitle}>{lang.registration.secondaryText.title}</Text>
                    <Text style = {styles.text}>{lang.registration.secondaryText.text}</Text>
                </View>
                <View style = {styles.inputCont}>
                    <Input
                        index = {0}
                        value = {first_name}
                        validate = {validate}
                        onChange = {inputOnchange}
                        minSymb = {lang.formWarnings.minSymbQuant3}
                        checkers = {checkers}
                        alphaCheckers = {alphaCheckers}
                        placeholder = {lang.inputPlaceHolder.name}
                    />
                    <Input
                        index = {1}
                        value = {last_name}
                        validate = {validate}
                        onChange = {inputOnchange}
                        minSymb = {lang.formWarnings.minSymbQuant3}
                        checkers = {checkers}
                        alphaCheckers = {alphaCheckers}
                        placeholder = {lang.inputPlaceHolder.surname}
                    />
                    <Input
                        index = {2}
                        value = {middle_name}
                        validate = {validate}
                        onChange = {inputOnchange}
                        minSymb = {lang.formWarnings.minSymbQuant3}
                        checkers = {checkers}
                        alphaCheckers = {alphaCheckers}
                        placeholder = {lang.inputPlaceHolder.patronymic}
                    />
                    <Input
                        index = {3}
                        value = {phone}
                        keyboardType = 'decimal-pad'
                        onFocus = {handleFocus}
                        validate = {validate}
                        onChange = {inputOnchange}
                        minSymb = {lang.formWarnings.minSymbQuant12}
                        numberCheckers = {numberCheckers}
                        checkers = {checkers}
                        placeholder = {lang.inputPlaceHolder.numberPhone}
                    />
                    <Input
                        index = {4}
                        value = {password}
                        validate = {validate}
                        onChange = {inputOnchange}
                        minSymb = {lang.formWarnings.minSymbQuant6}
                        checkers = {checkers}
                        placeholder = {lang.inputPlaceHolder.password}
                        secureTextEntry = {true}
                    />
                    <Input
                        index = {5}
                        value = {password_confirm}
                        validate = {validate}
                        onChange = {inputOnchange}
                        minSymb = {lang.formWarnings.minSymbQuant6}
                        checkers = {checkers}
                        placeholder = {lang.inputPlaceHolder.passwordConfirm}
                        secureTextEntry = {true}
                    />
                <Error/>
                </View>
                <View style = {styles.buttonCont}>
                    <ButtonCustom
                        title = {lang.buttonTitles.save}
                        onPress = {next}
                    />
                </View>
            </ScrollView>
        </View>
    )
})

export const RegistrationJobGiver = RegistrationJobGiverIn

const styles = StyleSheet.create({
    cont: {
        width: '100%',
        height: '100%',
        padding: 10,
        zIndex: -5
    },
    scrollViewCont: {
        alignItems: 'center',
        paddingBottom: 70,
        zIndex: -155,
        justifyContent: 'space-between',
    },
    textCont: {
        marginVertical: 40,
        alignItems: 'center',
        width: '100%'
    },
    textTitle: {
        fontSize: 16,
        marginBottom: 12,
        color: '#21243D'
    },
    text: {
        fontSize: 14,
        alignSelf: 'center',
        width: '75%',
        textAlign: 'center',
        opacity: 0.5,
        color: '#21243D',
        lineHeight: 19
    },
    inputCont: {
        alignItems: 'center',
        width: '100%',
    },
    buttonCont: {
        width: '100%',
        marginTop: 20,
        
        zIndex: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    incorrect: {
        color: 'red' 
    },
    transparent: {
        color: 'transparent'
    },
})
