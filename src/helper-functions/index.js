import { Linking, Platform, AsyncStorage, Alert, PermissionsAndroid } from 'react-native'
import { createRef } from 'react'
import { Api, portfolioApi } from '../api'
import { addPortfolio, setLang, setLoading, setPhotosUri, setRegData, setUser } from '../store'
import ImagePicker from 'react-native-image-picker'
// import {  } from '@react-native-community/async-storage'
import { getMeApi } from './../api/index'

export const dialCall = telephoneNumber => {

  let phoneNumber = ''

  if (Platform.OS === 'android') {
    phoneNumber = `tel:${telephoneNumber}`
  }
  else {
    phoneNumber = `telprompt:${telephoneNumber}`
  }

  Linking.openURL(phoneNumber)
}

export const saveLang = async value => {
  try {
    await AsyncStorage.setItem('activeLang', `${value}`)
  } catch (e) {
      console.log(e)
  }
}

export const getMe = async() => {
  const token = await getToken()
  console.log('getmestarted')
  if (token) {
    try {
      let res = await Api(getMeApi, null, 'post', token)
      if (res.code === 1) {
          setUser(res)
          console.log('getmeASdasda')
      } 
  } catch(err) {
      console.log('GETme', err)
  }
  }
}

export const getSavedLang = async () => {
  try {
    const value = await AsyncStorage.getItem('activeLang')
    if(value !== null) {
      if (value === 'ru') {
        setLang('ru')
      } else if (value === 'uz') {
        setLang('uz')
      }
    }
  } catch(e) {
    // error reading value
  }
}

export const saveToken = async value => {
  try {
    await AsyncStorage.setItem('token', `${value}`)
  } catch (e) {
      console.log(e)
  }
}

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token')
    if(value !== null) {
      return value
    } else {
      return null
    }
  } catch(e) {
    // error reading value
  }
}

export const imageGalleryLaunch = whichPhoto => {
  let options = {
  storageOptions: {
      skipBackup: true,
      path: 'images',
  },
  }

  ImagePicker.launchImageLibrary(options, (res) => {
  // console.log('Response = ', res)

  if (res.didCancel) {
      console.log('User cancelled image picker')
  } else if (res.error) {
      Alert.alert('ImagePicker Error: ', res.error)
  } else if (res.customButton) {
      console.log('User tapped custom button: ', res.customButton)
      alert(res.customButton)
  } else {
      // console.log(JSON.stringify(res,null,2))

      if (whichPhoto === 0) {
          setPhotosUri(res.uri, whichPhoto)
          setRegData({image: {
              size: res.fileSize,
              name: res.fileName,
              fileCopyUri: res.uri,
              type: res.type ? res.type : "image/jpeg",
              uri: res.uri
          }})
      } else if (whichPhoto === 1) {
          setPhotosUri(res.uri, whichPhoto)
          setRegData({passport_file: {
              size: res.fileSize,
              name: res.fileName,
              fileCopyUri: res.uri,
              type: res.type ? res.type : "image/jpeg",
              uri: res.uri
          }})
      } else if (whichPhoto === 2) {
          uploadPhoto({
            size: res.fileSize,
            name: res.fileName,
            fileCopyUri: res.uri,
            type: res.type ? res.type : "image/jpeg",
            uri: res.uri
          })
      } 
  }
  })
}  

export const cameraLaunch = whichPhoto => {
  PermissionsAndroid.requestMultiple(
    [
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ], {
      title: 'Permission',
      message: 'We need your permission.',
    },
  )
    .then((permRes) => {

    if (permRes['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
        permRes['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
      cameraLaunchA(whichPhoto)
    }
  })
}

export const cameraLaunchA = whichPhoto => {
    let options = {
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    }
    ImagePicker.launchCamera(options, (res) => {
    // console.log('Response = ', res)

    if (res.didCancel) {
        console.log('User cancelled image picker')
    } else if (res.error) {
        Alert.alert('ImagePicker Error: ', res.error)
    } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton)
        alert(res.customButton)
    } else {

        if (whichPhoto === 0) {
            setPhotosUri(res.uri, whichPhoto)
            setRegData({image: {
                size: res.fileSize,
                name: res.fileName,
                fileCopyUri: res.uri,
                type: "image/jpeg",
                uri: res.uri
            }})
        } else if (whichPhoto === 1) {
            setPhotosUri(res.uri, whichPhoto)
            setRegData({passport_file: {
                size: res.fileSize,
                name: res.fileName,
                fileCopyUri: res.uri,
                type: "image/jpeg",
                uri: res.uri
            }})
        } else if (whichPhoto === 2) {
            uploadPhoto({
              size: res.fileSize,
              name: res.fileName,
              fileCopyUri: res.uri,
              type: "image/jpeg",
              uri: res.uri
            })
        }
    }
    })

}

const uploadPhoto = async data => {
  var formdata = new FormData()
  formdata.append("image", data)
  console.log(JSON.stringify(formdata,null,2))
  const token = await getToken()
  if (token) {
    try {
      setLoading(true)
      let res = await Api(portfolioApi, formdata, 'post', token)
      console.log('uplodada',JSON.stringify(res,null,2))
      if (res.code === 1) {
        setUser(res.data, true)        
        setLoading(false)
      } else {
        setLoading(false)
        Alert.alert('not Uploaded')
      }
    } catch(err) {
        setLoading(false)
        console.log('portfolio', err)
        Alert.alert(err.toString())
    }
  } else {
    Alert.alert('upload error')
  }
}


export const navigationRef = createRef()

export const navigate = (name, params = null) => {
  navigationRef.current?.navigate(name, params)
}

export const goBack = () => {
  navigationRef.current?.goBack()
}

let dateNow = new Date()

let fullYear = dateNow.getFullYear() - 16

// fullYear = fullYear.getFullYear() - 16

export const maximumDate = new Date(fullYear.toString())

export const regexOnlyLetters = /^[A-Za-zа-яА-Я ]+$/

export const regexSpace = /\s/g

export const regexOnlyNumbers = /^\d+$/