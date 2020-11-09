import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, TextInput, Image, Dimensions, ScrollView, TouchableOpacity ,Text, Alert, PermissionsAndroid } from 'react-native'
import { Header } from '../../components/header'
import marker from '../../assets/icons/marker.png'
import InsetShadow from 'react-native-inset-shadow'
import ImageView from 'react-native-image-view'
import { ButtonCustom } from '../../components/button-custom'
import DatePicker from 'react-native-date-picker'
import payme from '../../assets/img/payme.png'
import humo from '../../assets/img/humo.png'
import click from '../../assets/img/click.png'
import cameraBig from '../../assets/icons/cameraBig.png'
import { lang, specList, user, location, setPhotosUri, loading, regData, setLoading, setUser, defaultUser, setPaymentUrl, setError } from '../../store'
import { Neomorph } from 'react-native-neomorph-shadows'
import { Input } from './../../components/input/index'
import { observer } from 'mobx-react';
import { GenderPhotoSpec } from '../../components/genderPhotoSpec'
import { cameraLaunch, getMe, getToken, imageGalleryLaunch, maximumDate, regexOnlyLetters, regexSpace, saveToken } from '../../helper-functions'
import { Loading } from '../../components/loading'
import { Api, updateApi } from '../../api'
import { MapCustom } from '../../components/map-custom'
import { Error } from '../../components/error'

const payments = [
    {
        img: payme,
        url: 'paycom'
    },
    {
        img: click,
        url: 'click'
    }
]

const emptyData = []

let handleDate = new Date()

const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        return true
      } else {
        console.log("Camera permission denied");
        return false
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const requestWritePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your WRITE_EXTERNAL_STORAGE " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the WRITE_EXTERNAL_STORAGE");
        return true
      } else {
        console.log("WRITE_EXTERNAL_STORAGE permission denied");
        return false
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestReadPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the Read storageee");
        return true
      } else {
        console.log("storageee permission denied");
        return false
      }
    } catch (err) {
      console.warn(err);
    }
  };


export const Profile = observer(({navigation}) => {

    useEffect(() => {
        if (user.data.image) {
            setPhotosUri(user.data.image.small, 0)
        }
        if (user.data.passport_file) {
            setPhotosUri(user.data.passport_file.small, 1)
        }
        getMe()
    }, [])

    let userLocation = {
        latitude: (user.message === 'success' && user.data.lat) ? Number(user.data.lat) : location.latitude,
        longitude: (user.message === 'success' && user.data.lat) ? Number(user.data.lon) : location.longitude,
        latitudeDelta: location.latitudeDelta,
        longitudeDelta: location.longitudeDelta
    }

    let initialLocation = {
        latitude: (user.message === 'success' && user.data.lat) ? Number(user.data.lat) : location.latitude,
        longitude: (user.message === 'success' && user.data.lon) ? Number(user.data.lon) : location.longitude,
        latitudeDelta: location.latitudeDelta,
        longitudeDelta: location.longitudeDelta
    }

    // console.log(JSON.stringify(user,null,2))

    const [upload, setUpload] = useState(false)

    const [imageView, setImageView] = useState(false)

    const [imageViewIndex, setImageViewIndex] = useState(0)

    const [comment, setComment] = useState(user.data.comment ? user.data.comment : '')

    const [birth_date, setDate] = useState(new Date(maximumDate))

    const [dateChoosen, setDateChoosen] = useState(false)

    const [datePickerState, setDatePickerState ] = useState(false)

    const [type, setType] = useState(user.data.type)

    const [first_name, setName] = useState(user.data.first_name)

    const [last_name, setSurname] = useState(user.data.last_name)

    const [middle_name, setPatronymic] = useState(user.data.middle_name)
    
    const [password, setPassword] = useState('')

    const [password_confirm, setPassword_confirm] = useState('')

    // const [pass, setNumberPhone] = useState(user.data.phone)

    const [checkers, setCheckers] = useState([])

    const [alphaCheckers, setAlphaCheckers] = useState([])

    const [master, setMaster] = useState(user.data.master)

    let images = []

    user.data.portfolio.map((item) => {
        images = [...images, {
            source: {
                uri: item.medium,
            },
            // width: 300,
            // height: 600,
        }]
    })

    const handleComment = e => {
        setComment(e.nativeEvent.text)
    }

    const validate = useCallback((index, value) => {
        let bigger
        if (index === 5 || index === 6 || index === 3) {
            bigger = 6
        } else {
            bigger = 4
        }
        if (value.length < bigger) {
            if ((index === 5 && value === '') || (index === 6 && value === '')) {
                const tmp = checkers.filter(item => item !== index)
                setCheckers(tmp)
            } else {
                setCheckers([...checkers, index])
            }
        } else {
            const tmp = checkers.filter(item => item !== index)
            setCheckers(tmp)
        }
    }, [checkers])

    const editUserLocation = useCallback(region => {
        // userLocation = region
        userLocation.latitude = region.latitude
        userLocation.longitude = region.longitude
    }, [userLocation])
    
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
            setNumberPhone(newValue)
        }
        if (index === 5) {
            setPassword(newValue)
        }
        if (index === 6) {
            setPassword_confirm(newValue)
        }
    },[])

    const uploadPortfolio = () => {
        setUpload(true)
    }

    const photoUploadLocal = async cameraPressed => {
        const permission = await requestCameraPermission()
        const permissionR = await requestReadPermission()
        const permissionW = await requestWritePermission()
        console.log('asdasdasdasdasda',permission)
        console.log('asdasdarrrrrrrrrrrrrr',permissionR)
        console.log('asdasdasdasdasdaWWWWWWWWWWWWWWWWW',permissionW)
        if (permission, permissionR, permissionW) {
            console.log(cameraPressed)
            if (cameraPressed) {
                cameraLaunch(2)
            } else {
                imageGalleryLaunch(2)
            }
        }

        setUpload(false)
    }

    const openPhoto = index => {
        setImageViewIndex(index - 1)
        setImageView(true)
    }

    const handlePayment = url => {
        navigation.navigate('Payment')
        setPaymentUrl(url)
    }

    const handleSetMaster = useCallback(master => setMaster(master), [])

    const handleSetDate = newDate => {
        console.log('iwladiset')
        handleDate = newDate
    }

    const handleSaveDate = () => {
        console.log('iwladisave')
        setDatePickerState(false)
        setDateChoosen(true)
        setDate(handleDate)
    }

    const handleCloseDatePicker = () => setDatePickerState(false)

    const handleSave = async () => {
        const token = await getToken()
        let passwordChanged = false
        let permissionForUpdate = false
        setError('')
        if (token) {
            if (!password && !password_confirm && (checkers.length < 1)) {
                passwordChanged = false
                permissionForUpdate = true
            } else {
                if (password && password_confirm) {
                    if (password === password_confirm) {
                        if (checkers.length < 1) {
                            passwordChanged = true
                            permissionForUpdate = true
                            console.log('passwordTrue',passwordChanged)
                        } else {
                            console.log('checkersPassword')
                            setError(lang.auth.fillFields)
                        }
                    } else {
                        console.log('eslesea1111111')
                        permissionForUpdate = false
                        setError(lang.formWarnings.passwordDontMatches)
                    }
                } else {
                    permissionForUpdate = false
                    if (checkers.length > 0 && !password && !password_confirm) {
                        setError(lang.auth.fillFields)
                        console.log('iffffffffffffffffffff')
                    } else {
                        console.log('esese22222222222222222')
                        setError(lang.formWarnings.passwordDontMatches)
                    }
                }
            }
            if (typeof user.data.birth_date === 'string') {
                var defaultBirthDate = user.data.birth_date.replace('/', '-').replace('/', '-').trim()
                console.log(defaultBirthDate)
            }
            if (permissionForUpdate) {
                var formdata = new FormData()
                if (type === 3) {
                    formdata.append("lat", userLocation.latitude)
                    formdata.append("lon", userLocation.longitude)
                    formdata.append("comment", comment)
                    formdata.append("master", master)
                    regData.image && formdata.append("image", regData.image)
                    regData.passport_file && formdata.append("passport_file", regData.passport_file)
                    !(master === 0) && formdata.append("specIds", regData.specializations.toString())
                    formdata.append("birth_date", dateChoosen ? birth_date.toISOString().slice(0, 10) : defaultBirthDate)
                }
                passwordChanged && formdata.append("password", password)
                passwordChanged && formdata.append("password_confirm", password_confirm)   
                formdata.append("first_name", first_name)
                formdata.append("last_name", last_name)
                formdata.append("middle_name", middle_name)
                // formdata.append("passport", regData.passport)
                formdata.append("type", type)
                
                console.log('ketti')
                console.log(JSON.stringify(formdata,null,2))

                try {
                    setLoading(true)
                    setError('')
                    let res = await Api(updateApi, formdata, 'post', token)
                    console.log('resss',JSON.stringify(res,null,2))
                    if (res.code === 1) {
                        setError('')
                        getMe()
                        setLoading(false)
                        navigation.navigate('Home')
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        })
                    } else {
                        setLoading(false)
                        if (res.errors) 
                            setError(Object.values(res.errors).toString())
                        else
                            setError(res.message.toString())
                    }
                    if (res.code === 0) {
                        setLoading(false)
                        Alert.alert(res.message)
                        navigation.navigate('Home')
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        })
                        setUser(defaultUser)
                        saveToken('')
                    }
                } catch(err) {
                    setLoading(false)
                    setError(err.toString())
                    console.log('ctach',err)
                }
            }
        } else {
            setError(lang.formWarnings.reLogin)
        }
    }

    return (
        <View style = {styles.cont}>
            <View style = {styles.headerCont}>
                <Header
                    title = {lang.profile.title}
                    onPress = {() => navigation.goBack()}
                />
            </View>
            <ScrollView
                contentContainerStyle = {styles.scrollViewCont}
                centerContent = {true}
            >
                <View style = {styles.paddingCont}>
                    <View style = {styles.typeCont}>
                        <ButtonCustom
                            title = {lang.profile.whoAmI.worker}
                            onPress = {() => setType(3)}
                            active = {(type === 3) && true}
                        />
                        <ButtonCustom
                            title = {lang.profile.whoAmI.jobGiver}
                            onPress = {() => setType(2)}
                            active = {(type === 2) && true}
                        />
                    </View>
                    {(type === 3) && <InsetShadow
                        bottom = {false}
                        right = {false}
                        shadowRadius = {500}
                        elevation = {4}
                        containerStyle = {styles.insetShadowTextArea}
                    >
                        <TextInput
                            placeholder = {lang.inputPlaceHolder.aboutMyself}
                            multiline = {true}
                            numberOfLines = {10}
                            value = {comment}
                            onChange = {handleComment}
                            style = {styles.textArea}
                        />
                    </InsetShadow>}
                    {(type === 3) && <View style = {styles.gridCont}>
                        {[cameraBig, ...user.data.portfolio].map((item, i) => {
                            if (i === 0) {
                                return (<TouchableOpacity
                                            key = {i}
                                            onPress = {uploadPortfolio}  
                                        >
                                            <InsetShadow
                                                bottom = {false}
                                                right = {false}
                                                shadowRadius = {500}
                                                elevation = {4}
                                                containerStyle = {styles.imageInsetShadow}
                                            >
                                                <View style = {styles.insideBorder}>
                                                    <Image 
                                                        style = {styles.uploadButton} 
                                                        source = {item}
                                                        resizeMode = 'contain'
                                                    />
                                                </View>
                                            </InsetShadow>
                                        </TouchableOpacity>
                                )
                            } else {
                                return (<TouchableOpacity
                                            key = {i}
                                            onPress = {() => openPhoto(i)}
                                        >
                                            <InsetShadow
                                                bottom = {false}
                                                right = {false}
                                                shadowRadius = {500}
                                                elevation = {4}
                                                containerStyle = {styles.imageInsetShadow}
                                            >
                                                <View style = {styles.insideBorder}>
                                                    <Image 
                                                        style = {styles.image} 
                                                        source = {{uri: item.small}}
                                                        resizeMode = 'cover'
                                                    />
                                                </View>
                                            </InsetShadow>
                                        </TouchableOpacity>)
                            }
                        })} 
                    </View>}
                    <ImageView
                        animationType = 'slide'
                        images={images}
                        imageIndex={imageViewIndex}
                        isVisible={imageView}
                        onClose = {() => setImageView(false)}
                    />
                    {/* {(type === 3) && <View style = {styles.balanceCont}>
                        <Text style = {styles.balanceTitle}>{lang.profile.balance.title}</Text>
                        <Text style = {styles.balanceText}>{lang.profile.balance.text}</Text>
                    </View>} */}
                    {(type === 3) && <View style = {styles.paymentsMapCont}>
                        {payments.map((item, i) => (
                            <TouchableOpacity 
                                onPress = {() => handlePayment(item.url)}
                                key = {i}
                                style = {styles.paymentsTouchable}
                            >
                                <Neomorph
                                    lightShadowColor = "#FFF" // <- this// <- change zIndex of each shadow color
                                    darkShadowColor = "#000" // <- set this
                                    style = {styles.paymentsCont}
                                >
                                    <Image 
                                        style = {styles.paymentsImg} 
                                        source = {item.img}
                                        resizeMode = 'contain'
                                    />
                                </Neomorph>
                            </TouchableOpacity>
                        ) )}
                    </View>}
                    <View style = {styles.balanceCont}>
                        <Text style = {styles.balanceTitle}>{lang.profile.myData.title}</Text>
                        <Text style = {styles.balanceText}>{lang.profile.myData.text}</Text>
                    </View>
                    <View style = {styles.inputCont}>
                        <Input
                            index = {0}
                            value = {first_name}
                            validate = {validate}
                            alphaCheckers = {alphaCheckers}
                            minSymb = {lang.formWarnings.minSymbQuant3}
                            onChange = {inputOnchange}
                            placeholder = {lang.inputPlaceHolder.name}
                            checkers = {checkers}
                        />
                        <Input
                            index = {1}
                            value = {last_name}
                            validate = {validate}
                            alphaCheckers = {alphaCheckers}
                            minSymb = {lang.formWarnings.minSymbQuant3}
                            onChange = {inputOnchange}
                            placeholder = {lang.inputPlaceHolder.surname}
                            checkers = {checkers}
                        />
                        <Input
                            index = {2}
                            value = {middle_name}
                            alphaCheckers = {alphaCheckers}
                            validate = {validate}
                            minSymb = {lang.formWarnings.minSymbQuant3}
                            onChange = {inputOnchange}
                            placeholder = {lang.inputPlaceHolder.patronymic}
                            checkers = {checkers}
                        />
                        {/* <Input
                            index = {3}
                            value = {passport}
                            validate = {validate}
                            onChange = {inputOnchange}
                            minSymb = {lang.formWarnings.minSymbQuant6}
                            checkers = {checkers}
                            placeholder = {lang.inputPlaceHolder.passport}
                        /> */}
                        <Input
                            index = {5}
                            value = {password}
                            validate = {validate}
                            minSymb = {lang.formWarnings.minSymbQuant6}
                            onChange = {inputOnchange}
                            placeholder = {lang.inputPlaceHolder.password}
                            secureTextEntry = {true}
                            checkers = {checkers}
                        />
                        <Input
                            index = {6}
                            value = {password_confirm}
                            validate = {validate}
                            minSymb = {lang.formWarnings.minSymbQuant6}
                            onChange = {inputOnchange}
                            placeholder = {lang.inputPlaceHolder.passwordConfirm}
                            checkers = {checkers}
                            secureTextEntry = {true}
                        />
                       {(type === 3) && <TouchableOpacity 
                            style = {styles.dateTouchableCont}
                            onPress = {() => setDatePickerState(true)}
                        >
                            <InsetShadow
                                bottom = {false}
                                right = {false}
                                shadowRadius = {500}
                                elevation = {2.5}
                                containerStyle = {styles.insetShadow}
                            >
                                <Text 
                                    style = {styles.birthYear}
                                >
                                    {!dateChoosen ? user.data.birth_date : birth_date.toISOString().slice(0, 10)}
                                </Text>
                            </InsetShadow>   
                        </TouchableOpacity>}
                    </View>
                    {(type === 3) && <GenderPhotoSpec
                        portfolio
                        master = {master}
                        setMaster = {handleSetMaster}
                    />}
                    
                    {(type === 3) && <View style = {styles.balanceCont}>
                        <Text style = {styles.balanceTitle}>{lang.registration.locationTitle}</Text>
                        <Text style = {styles.balanceText}>{lang.profile.myData.text}</Text>
                    </View>}
                </View>
                <Error/>
                {(type === 3) && <View style = {styles.mapCont}>
                    <MapCustom
                        onRegionChangeComplete = {editUserLocation}
                        initialRegion = {initialLocation}
                        data = {emptyData}
                    />
                    <Image
                        style = {styles.marker}
                        source = {marker}
                        resizeMode = 'contain'
                    />
                </View>}
                <View
                    style = {styles.buttonContMap}
                >
                    <ButtonCustom
                        title = {lang.buttonTitles.edit}
                        onPress = {handleSave}
                    />
                </View>
            </ScrollView>
            {(type === 3) && <View style = {datePickerState ? styles.datePickerCont : styles.hide}>
                <View style = {styles.datePickerContent}>
                    <DatePicker
                        date={handleDate}
                        mode = 'date'
                        onDateChange = {handleSetDate}
                        androidVariant = "nativeAndroid"
                        maximumDate = {maximumDate}
                    />
                    <ButtonCustom
                        helperStyle = {styles.dateChooseBtn}
                        title = {lang.buttonTitles.ok}
                        onPress = {handleSaveDate}
                    />
                </View>
                <Text onPress = {handleCloseDatePicker} style = {styles.portfolioBg}></Text>
            </View>}
            <View style = {upload ? styles.portfolioAddCont : styles.hide}>
                <View style = {styles.portfolioAddContMini}>
                    <ButtonCustom
                        onPress = {() => photoUploadLocal(true)}
                        title = {lang.registration.photoText.camera}
                    />
                    <ButtonCustom
                        title = {lang.registration.photoText.gallery}
                        onPress = {() => photoUploadLocal(false)}
                    />
                </View>
                <Text onPress = {() => setUpload(false)} style = {styles.portfolioBg}></Text>
            </View>
            {loading.value && <Loading/>}
        </View>
    )
})

const styles = StyleSheet.create({
    cont: {
        paddingVertical: 10,
        backgroundColor: '#F0F2F6',
    },
    headerCont: {
        alignSelf: 'center',
    },
    scrollViewCont: {
        // padding: 10,
        paddingTop: 10,
        width: '100%',
        zIndex: -154,
        alignItems: 'center',
        paddingBottom: 150,
    },
    paddingCont: {
        padding: 10,
        width: '100%',
        alignItems: 'center',
    },
    insetShadowTextArea: {
        height: 'auto',
        width: '100%',
        borderRadius: 4,
        marginVertical: 10
    },
    textArea: {
        height: 200,
        padding: 10,
        width: '100%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 4,
        backgroundColor: '#F0F2F6',
        textAlignVertical: 'top'
    },
    gridCont: {
        width: '100%', 
        marginTop: 50,
        flexWrap: 'wrap', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 7,
    },
    imageInsetShadow: {
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 1,
        height: Dimensions.get('screen').width / 3 - 10,
        borderRadius: 7,
        marginVertical: 3
    },
    insideBorder: {
        width: Dimensions.get('screen').width / 3 - 10,
        height: Dimensions.get('screen').width / 3 - 10,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 7,
    },
    uploadButton: {
        width: '40%',
        height: '40%',
        alignSelf: 'center',
        // borderWidth: 2,
        // borderColor: '#fff',
        // borderRadius: 7,
    },  
    balanceCont: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    balanceTitle: {
        fontSize: 16,
        lineHeight: 19,
        fontWeight: 'bold',
        marginVertical: 12,
        color: '#21243D',
    },
    balanceText: {
        textAlign: 'center',
        color: '#21243D50',
        lineHeight: 16,
        fontSize: 14
    },
    paymentsMapCont: {
        marginTop: 20,
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    paymentsTouchable: {
        zIndex: 22
    } ,
    paymentsCont: {
        shadowOffset: {
            width: 1.2, 
            height: 1.5
        },
        shadowOpacity: 0.07, // <- and this or yours opacity
        shadowRadius: 2,
        borderRadius: 8,
        // zIndex: 655,
        backgroundColor: '#F0F2F6',
        width: Dimensions.get('screen').width / 2 - 20,
        height: 90,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        
    },
    paymentsImg: {
        width: 70,
        // height: 4?0
        
    },
    typeCont: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // padding: 10,
        marginVertical: 40
    },
    inputCont: {
        width: '100%',
        marginBottom: 100,
        marginTop: 20,
        alignItems: 'center',
        
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
        backgroundColor: 'rgba(0, 0, 0, 0.81)'
    },
    datePickerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        zIndex: 222,
        borderRadius: 4
    },
    dateChooseBtn: {
        paddingBottom: 10,
        paddingTop: 10,
        marginTop: 30,
        flex: 0
    },
    dateTouchableCont: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    },
    insetShadow: {
        height: 'auto',
        width: '80%',
        backgroundColor: 'red',
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
    mapCont: {
        marginTop: 20,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').width - 20,
        flex: 1,
    },
    map: {
        flex: 1,
        zIndex: -54,
      // ...StyleSheet.absoluteFillObject,
    },
    marker: {
        position: 'absolute',
        top: (Dimensions.get('window').width) / 2 - 60,
        width: 30,
        height: 50,
        alignSelf: 'center',
        
        zIndex: 54

    },
    buttonContMap: {
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 180
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
    photoOpenCont: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoOpen: {
        width: '100%',
        height: '100%'
    },
    portfolioAddCont: {
        position: 'absolute',
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        padding: 10,
        // top: '25%',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.50)'
    },
    portfolioAddContMini: {
        padding: 20,
        zIndex: 1,
        alignSelf: 'center',
        // alignItems: 'center',
        // justifyContent: 'center',
        // flexDirection: 'column',
        backgroundColor: '#fff'
    },
    portfolioBg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 0,
    },
    hide: {
        display: 'none',
    }
})