import React, { useCallback, useState } from 'react'
import { View, StyleSheet, Image, Text, Alert, ScrollView, TouchableOpacity } from 'react-native'
import { Header } from '../../components/header'
import { error, lang, registration, setError, setUser } from './../../store/index'
import authImg from '../../assets/img/auth.png'
import { Input } from '../../components/input'
import { ButtonCustom } from '../../components/button-custom'
import { Api, authApi } from '../../api'
import { Loading } from '../../components/loading'
import { observer } from 'mobx-react';
import { saveToken } from '../../helper-functions'
import { Error } from '../../components/error'


const AuthIn = observer(({navigation}) => {

    const [phone, setPhone] = useState('')

    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)

    const [checkers, setCheckers] = useState([])

    const handleBack = useCallback(() => {
        navigation.navigate('Home')
    }, [])

    const handleFocus = () => {
        if (phone === '') {
            setPhone('+998')
        }
    }

    const validate = useCallback((index, value) => {
        let bigger
        if (index === 0) {
            bigger = 12
        } else {
            bigger = 6
        }
        if (value && value.length < bigger) {
            setCheckers([...checkers, index])
        } else {
            const tmp = checkers.filter(item => item !== index)
            setCheckers(tmp)
        }
    }, [checkers]) 

    // const handleSetPhone = useCallback((argPhone) => {
    //     setPhone(argPhone.nativeEvent.text)
    // },[phone, setPhone])

    // const handleSetPassword = useCallback((argPassword) => {
    //     setPassword(argPassword.nativeEvent.text)
    // },[password, setPassword])

    const inputOnchange = useCallback((value, index) => {
        console.log(value, index)
        const newValue = value.trim()         
        if (index === 0) {
            setPhone(newValue)
        }
        if (index === 1) {
            setPassword(newValue)
        }
    }, [])

    const generalValidate = () => {
        let newCheckers = []
        if (!phone) {
            newCheckers = [...newCheckers, 0]
        }
        if (!password) {
            newCheckers = [...newCheckers, 1]
        }
        
        setCheckers(newCheckers)
    }

    const handleRegistration = useCallback(() => {
        navigation.navigate(registration.value)
        setError('')
    }, [registration])

    const signIn = useCallback(async () => {
        console.log(phone, password)
        if (phone && password && (checkers.length < 1)) {
            const data = new FormData()
            data.append("phone", phone)
            data.append("password", password)
            setLoading(true)
            try {
                let res = await Api(authApi, data, 'post')
                console.log(JSON.stringify(res,null,2))
                setError('')
                if (res.code === 1) {
                    console.log(JSON.stringify(res,null,2))
                    setUser(res)
                    saveToken(res.data.token)
                    navigation.navigate('Home')
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    })
                    navigation.openDrawer()
                    setLoading(false)
                } else {
                    if (res.errors) 
                        setError(Object.values(res.errors).toString())
                    else
                        setError(res.message.toString())
                    setLoading(false)
                }
            } catch(err) {
                Alert.alert(err)
                setLoading(false)
            }
        } else {
            generalValidate()
            setLoading(false)
        }
    },[password, phone, checkers])


    return (
        <View style = {styles.cont}>
            <Header
                onPress = {handleBack}
                title = {lang.auth.title}
            />   
            {loading && <Loading/>}
            <ScrollView 
                contentContainerStyle={styles.scrollViewCont}
                centerContent = {true}
            >
                <Image
                    source = {authImg}
                    resizeMode = 'contain'
                    style = {styles.img}
                />
                <Text style = {styles.request}>{lang.auth.request}</Text>
                <Input
                    index = {0}
                    validate = {validate}
                    onFocus = {handleFocus}
                    keyboardType = 'phone-pad'
                    minSymb = {lang.formWarnings.minSymbQuant12}
                    checkers = {checkers}
                    value = {phone}
                    onChange = {inputOnchange}
                    placeholder = {lang.inputPlaceHolder.numberPhone}
                />
                <Input
                    index = {1}
                    validate = {validate}
                    minSymb = {lang.formWarnings.minSymbQuant6}
                    checkers = {checkers}
                    secureTextEntry = {true}
                    value = {password}
                    onChange = {inputOnchange}
                    placeholder = {lang.inputPlaceHolder.passwordOrID}
                />
                <Error/>
                <View style = {styles.helperBar}>
                    <Text style = {styles.helperBarLeft}>{lang.auth.helperBar.primary}</Text>
                    <TouchableOpacity
                        onPress = {handleRegistration}
                    >
                        <Text 
                            style = {styles.helperBarRight}
                        >
                            {lang.auth.helperBar.secondary}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.buttonCont}>
                    <ButtonCustom
                        helperStyle = {styles.buttonStyle}
                        title = {lang.auth.buttonTitle}
                        onPress = {signIn}
                    />
                </View>
            </ScrollView>
        </View>
    )
})

export const Auth = React.memo(AuthIn)


const styles = StyleSheet.create({
    cont: {
        width: '100%',
        padding: 10,
        backgroundColor: '#F0F2F6',
        // alignItems: 'center',
        // flexDirection: 'column',
        // justifyContent: 'space-between',
    },
    scrollViewCont: {
        padding: 10,
        width: '100%',
        // zIndex: -154,
        alignItems: 'center',
        paddingBottom: 70,
    },
    img: {
        // maxHeight: 400,
        // maxWidth: 400,
        marginVertical: 20,
        width: 200,
        height: 200
    },
    request: {
        fontSize: 16,
        marginVertical: 5,
        textAlign: 'center',
        width: '60%'
    },
    inputCont: {
        width: '80%',
    },
    helperBar: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 30,
    },
    helperBarLeft: {
        borderRightWidth: 2,
        borderColor: 'grey',
        marginRight: 5,
        paddingRight: 5,
    },
    helperBarRight: {
        fontWeight: 'bold',
        
    },
    // touchableButton: {
    //     padding: 5
    // },
    buttonCont: {
        width: '100%',
        // zIndex: 3221,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        padding: 10,
    },
    incorrect: {
        color: 'red' 
    },
    transparent: {
        color: 'transparent'
    },
})