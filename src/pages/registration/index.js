import React, { useCallback, useState } from 'react'
import { View, StyleSheet, Text, Alert, ScrollView } from 'react-native'
import { Header } from '../../components/header'
import { lang, setError, setRegData } from './../../store/index'
import { Input } from '../../components/input'
import { ButtonCustom } from '../../components/button-custom'
import DatePicker from 'react-native-date-picker'
import InsetShadow from 'react-native-inset-shadow'
import { observer } from 'mobx-react'
import { maximumDate, regexOnlyLetters, regexOnlyNumbers, regexSpace } from '../../helper-functions'
import { Error } from '../../components/error'


export const Registration = observer(({navigation}) => {

    const [birth_date, setDate] = useState(maximumDate)

    const [dateChoosen, setDateChoosen] = useState(false)

    const [datePickerState, setDatePickerState ] = useState(false)

    const [first_name, setName] = useState('')

    const [last_name, setSurname] = useState('')

    const [passport, setPassport] = useState('')

    const [middle_name, setPatronymic] = useState('')
    
    const [password, setPassword] = useState('')

    const [password_confirm, setPassword_confirm] = useState('')

    const [phone, setNumberPhone] = useState('')

    const [alphaCheckers, setAlphaCheckers] = useState([])

    const [checkers, setCheckers] = useState([])

    const [numberCheckers, setNumberCheckers] = useState([])


    const handleFocus = () => {
        if (phone === '') {
            setNumberPhone('+998')
        }
    }

    const validate = useCallback((index, value) => {
        // console.log(checkers)
        // console.log('validate')
        let bigger
        if (index === 4) {
            bigger = 12
        } else if (index === 3 || index === 5 || index === 6) {
            bigger = 6
        } else {
            bigger = 4
        }
        if (value && value.length < bigger) {
            if (!(checkers.includes(index))) {
                setCheckers([...checkers, index])
            }
        } else if (!value) {
            if (!(checkers.includes(index))) {
                console.log('elseif validate')
                setCheckers([...checkers, index])
            }
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
                setPatronymic(newValue)
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
            setPassport(newValue)
        }
        if (index === 4) {
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
        if (index === 5) {
            setPassword(newValue)
        }
        if (index === 6) {
            setPassword_confirm(newValue)
        }
    }, [])

    const handleChooseDate = useCallback(() => {
        setDatePickerState(false)
        setDateChoosen(true)
    }, [datePickerState, dateChoosen])

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
        if (!passport) {
            newCheckers = [...newCheckers, 3]
        }
        if (phone.length < 4) {
            newCheckers = [...newCheckers, 4]
        }
        if (!password) {
            newCheckers = [...newCheckers, 5]
        }
        if (!password_confirm) {
            newCheckers = [...newCheckers, 6]
        }
        setCheckers(newCheckers)
    }

    const next = () => {
        if (first_name && last_name && passport && middle_name && phone && password && password_confirm && (checkers.length < 1)) {
            if (password === password_confirm) {
                console.log('asdasdasdphpenenenenene', phone)
                navigation.navigate('RegistrationNext')
                setError('')
                setRegData({
                    first_name,
                    last_name,
                    passport,
                    middle_name,
                    phone,
                    birth_date: birth_date.toISOString().slice(0, 10),
                    password,
                    password_confirm
                })
            } else {
                setError(lang.formWarnings.passwordDontMatches)
            }
        } else {
            generalValidate()
            // Alert.alert(lang.auth.fillFields)
            
        }
    }

    return(
        <View style = {styles.cont}>
            <Header
                onPress = {navigation.goBack}
                title = {lang.registration.title}
            />
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
                        value = {passport}
                        validate = {validate}
                        onChange = {inputOnchange}
                        minSymb = {lang.formWarnings.minSymbQuant6}
                        checkers = {checkers}
                        placeholder = {lang.inputPlaceHolder.passport}
                    />
                    <Input
                        index = {4}
                        value = {phone}
                        onFocus = {handleFocus}
                        keyboardType = 'numeric'
                        validate = {validate}
                        onChange = {inputOnchange}
                        minSymb = {lang.formWarnings.minSymbQuant12}
                        checkers = {checkers}
                        numberCheckers = {numberCheckers}
                        placeholder = {lang.inputPlaceHolder.numberPhone}
                    />
                    <Input
                        index = {5}
                        value = {password}
                        validate = {validate}
                        onChange = {inputOnchange}
                        minSymb = {lang.formWarnings.minSymbQuant6}
                        checkers = {checkers}
                        placeholder = {lang.inputPlaceHolder.password}
                        secureTextEntry = {true}
                    />
                    <Input
                        index = {6}
                        value = {password_confirm}
                        validate = {validate}
                        onChange = {inputOnchange}
                        minSymb = {lang.formWarnings.minSymbQuant6}
                        checkers = {checkers}
                        placeholder = {lang.inputPlaceHolder.passwordConfirm}
                        secureTextEntry = {true}
                    />
                    <InsetShadow
                        bottom = {false}
                        right = {false}
                        shadowRadius = {500}
                        elevation = {2.5}
                        containerStyle = {styles.insetShadow}
                    >
                        <Text 
                            style = {styles.birthYear}
                            onPress = {() => setDatePickerState(true)}
                        >
                            {!dateChoosen ? lang.inputPlaceHolder.birthYear : birth_date.toISOString().slice(0, 10)}
                        </Text>
                    </InsetShadow>
                </View>
                <Error/>
                <View style = {styles.buttonCont}>
                    <ButtonCustom
                        helperStyle = {styles.buttonStyle}
                        title = {lang.buttonTitles.next}
                        onPress = {next}
                    />
                </View>
            </ScrollView>
            <View style = {datePickerState ? styles.datePickerCont : styles.hide}>
                <DatePicker
                    date={birth_date}
                    mode = 'date'
                    maximumDate = {maximumDate}
                    onDateChange = {setDate}
                    androidVariant = "nativeAndroid"
                />
                <ButtonCustom
                    helperStyle = {styles.dateChooseBtn}
                    title = {lang.buttonTitles.ok}
                    onPress = {handleChooseDate}
                />
            </View>
        </View>
    )
})
const styles = StyleSheet.create({
    cont: {
        backgroundColor: '#F0F2F6',
        padding: 10,
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
    scrollViewCont: {
        alignItems: 'center',
        paddingBottom: 70,
        justifyContent: 'space-between',
    },
    inputCont: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 54,
    },
    incorrect: {
        color: 'red' 
    },
    transparent: {
        color: 'transparent'
    },
    datePickerCont: {
        position: 'absolute',
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        padding: 10,
        // top: '25%',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(255, 255, 255)'
    },
    dateChooseBtn: {
        paddingBottom: 10,
        paddingTop: 10,
        marginTop: 30,
        flex: 0
    },
    insetShadow: {
        height: 'auto',
        width: '80%',
        
        borderRadius: 4,
        marginVertical: 10
    },
    birthYear: {
        fontSize: 16,
        backgroundColor: '#F0F2F6',
        borderWidth: 2,
        color: 'rgba(33, 36, 61, 0.5)',
        borderColor: '#fff',
        borderRadius: 4,
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 10
    },
    buttonCont: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        paddingTop: 10,
        paddingBottom: 10
        },
    hide: {
        display: 'none',
    }
})