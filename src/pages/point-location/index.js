import React, { useState } from 'react'
import { StyleSheet, View, Text, Dimensions, Image, Alert } from 'react-native'
import MapView from 'react-native-maps'
import { Header } from '../../components/header'
import marker from '../../assets/icons/marker.png'
import { lang, error, setError, regData, setRegData } from '../../store'
import { ButtonCustom } from '../../components/button-custom'
import { signUpApi, Api } from '../../api'
import { observer } from 'mobx-react'
import { Loading } from '../../components/loading'
import { MapCustom } from '../../components/map-custom'
import { Error } from '../../components/error'


export const PointLocation = observer(props => {

    const [loading, setLoading] = useState(false)

    const selectLocation = region => {
        console.log(region)
        setRegData({
            lat: region.latitude,
            lon: region.longitude
        })
    }

    const handleSave = async () => {
        var formdata = new FormData()
        formdata.append("phone", regData.phone)
        formdata.append("password", regData.password)
        formdata.append("password_confirm", regData.password_confirm)
        formdata.append("birth_date", regData.birth_date)
        formdata.append("first_name", regData.first_name)
        formdata.append("last_name", regData.last_name)
        formdata.append("middle_name", regData.middle_name)
        formdata.append("lat", regData.lat)
        formdata.append("lon", regData.lon)
        formdata.append("passport", regData.passport)
        formdata.append("type", "3")
        formdata.append("master", regData.master)
        formdata.append("gender", regData.gender)
        formdata.append("image", regData.image)
        formdata.append("passport_file", regData.passport_file)
        formdata.append("specIds", regData.specializations.toString())
        console.log('ketti')
        console.log(JSON.stringify(formdata,null,2))

        try {
            setLoading(true)
            let res = await Api(signUpApi, formdata, 'post')
            setError('')
            console.log('resss',JSON.stringify(res,null,2))
            if (res.code === 1) {
                setLoading(false)
                props.navigation.navigate('Home')
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })
                setError('')
            } else {
                setLoading(false)
                if (res.errors) 
                    setError(Object.values(res.errors).toString())
                else
                    setError(res.message.toString())
            }
        } catch(err) {
            setLoading(false)
            console.log('ctach',err)
        }
    }

    return (
        <View style = {styles.cont}>
            {loading && <Loading/>}
            <View style = {styles.top}>
                <Header
                    onPress = {props.navigation.goBack}
                    title = {lang.registration.title}
                />
                <View style = {styles.textCont}>
                    <Text style = {styles.text}>{lang.registration.locationTitle}</Text>
                </View>
            </View>
            <View style = {styles.mapCont}>
                <MapCustom
                    onRegionChangeComplete = {selectLocation}
                    data = {[]}
                />
                <Image
                    style = {styles.marker}
                    source = {marker}
                    resizeMode = 'contain'
                />
                <View
                    style = {styles.buttonCont}
                >
                    <ButtonCustom
                        title = {lang.buttonTitles.save}
                        onPress = {handleSave}
                    />
                </View>
            </View>
            <Error/>
        </View>
    )
})

  

const styles = StyleSheet.create({
    cont: {
        width: '100%',
        backgroundColor: '#F0F2F6',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    top: {
        padding: 10,
        alignItems: 'center',
        width: '100%',
        height: 200,
    },
    textCont: {
        width: '100%',
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        zIndex: 5315,
        shadowOffset: {
            width: 2,
            height: 20,
        },
        shadowOpacity: 0.9,
        elevation: 50,
    },
    text: {
        fontSize: 16,
        color: '#21243D'
    },
    mapCont: {
        width: Dimensions.get('screen').width,
        flex: 1,
    },
    map: {
        flex: 1,
        zIndex: -54,
      // ...StyleSheet.absoluteFillObject,
    },
    marker: {
        position: 'absolute',
        top: (Dimensions.get('window').height - 200) / 2 - 50,
        width: 30,
        height: 50,
        alignSelf: 'center',
        
        zIndex: 54

    },
    buttonCont: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 10
    },
    
})