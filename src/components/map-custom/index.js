import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, Image, Alert, Platform, PermissionsAndroid, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import marker from '../../assets/icons/marker.png'
import userLocation from '../../assets/icons/userLocation.png'
import markerWoman from '../../assets/icons/markerWoman.png'
import { setLocation } from '../../store'
import { Neomorph } from 'react-native-neomorph-shadows'
import { observer } from 'mobx-react';
import Geolocation from 'react-native-geolocation-service'
import Ripple from 'react-native-material-ripple'

const MapCustomIn = observer(({onMarkerPress, onPress, onRegionChangeComplete, data, initialRegion}) => {


    const [regChanged, setRegChanged] = useState(false)

    const [currenLocat, setCurrentLocat] = useState({
        latitude: initialRegion ? initialRegion.latitude : 41.311081,
        longitude: initialRegion ? initialRegion.longitude : 69.240562,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0021,
    })

    const handleChangeRegion = () => {
        setRegChanged(true)
    }

    const handleSetCurrentLocat = useCallback(newLocation => setCurrentLocat(newLocation), [])

    const handleSetRegChanged = useCallback(change => setRegChanged(change), [])

    return (
        <>
            {!regChanged ? <MapView
                style = {styles.map}
                onRegionChangeComplete = {onRegionChangeComplete}
                moveOnMarkerPress = {false}
                region = {currenLocat}
                onPress = {onPress}
                showsUserLocation = {true}
                onRegionChange = {handleChangeRegion}
            >
                {data.map((item, i) => {
                    if (item.lat && item.lon) {
                        return (
                            <Marker
                                onPress = {() => onMarkerPress(i)}
                                coordinate = {{
                                    latitude: item.lat,
                                    longitude: item.lon,
                                }}
                                key = {i}
                            >
                                <Image
                                    resizeMode = 'contain'
                                    style = {styles.marker}
                                    source = {item.gender === 1 ? marker : markerWoman}
                                />
                            </Marker>
                        )
                    }
                })}
            </MapView> : <MapView
                onRegionChangeComplete = {onRegionChangeComplete}
                moveOnMarkerPress = {false}
                style = {styles.map}
                onPress = {onPress}
                showsUserLocation = {true}
            >
                {data.map((item, i) => {
                    if (item.lat && item.lon) {
                        return (
                            <Marker
                                onPress = {() => onMarkerPress(i)}
                                coordinate = {{
                                    latitude: item.lat,
                                    longitude: item.lon,
                                }}
                                key = {i}
                            >
                                <Image
                                    resizeMode = 'contain'
                                    style = {styles.marker}
                                    source = {item.gender === 1 ? marker : markerWoman}
                                />
                            </Marker>
                        )
                    }
                })}
            </MapView>}
            <MyLocation
                handleSetCurrentLocat = {handleSetCurrentLocat} 
                handleSetRegChanged = {handleSetRegChanged}
            />
        </>
    )
})

export const MapCustom = React.memo(MapCustomIn)

export const MyLocation = React.memo(({handleSetCurrentLocat, handleSetRegChanged}) => {
    const requestPermissions = async() => {
        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization();
            Geolocation.setRNConfiguration({
                skipPermissionRequests: false,
                authorizationLevel: 'whenInUse',
            })
        }
      
        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            )
        }
        return true
      }

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords
                if (latitude && longitude) {
                    setLocation(latitude, longitude)
                    handleSetCurrentLocat({
                        latitude,
                        longitude,
                        latitudeDelta: 0.0122,
                        longitudeDelta: 0.0021,
                    })
                }
            },
            (error) => {
                console.log('asdasdlocat',error)
                // See error code charts below.
                Alert.alert("can't get location")
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
    }

    const goToMyLocation =  async() => {
        console.log('locatioasbda')
        const permission = await requestPermissions()
        if (permission) {
            getCurrentLocation()
            handleSetRegChanged && handleSetRegChanged(false)
        }
    }

    return (
        <Ripple
            rippleColor = '#ffffff00'
            style = {styles.mapIconCont}
            onPress = {goToMyLocation}
        >
            <TouchableOpacity>
                <Neomorph
                    lightShadowColor = "#FFF" // <- this// <- change zIndex of each shadow color
                    darkShadowColor = "#000" // <- set this
                    style = {styles.mapIconShadow}
                >
                    <Image
                        style = {styles.mapIcon}
                        resizeMode = 'contain'
                        source = {userLocation}
                    />
                </Neomorph>
            </TouchableOpacity>
        </Ripple>
    )
})

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
        zIndex: 0
    },
    mapIconCont: {
        // zIndex: 654654,
        position: 'absolute',
        bottom: 80,
        right: 20,
    },
    mapIconShadow: {
        width: 50,
        height: 50,
        shadowOffset: {
            width: 1.2, 
            height: 1.5
        },
        shadowOpacity: 0.1, 
        shadowRadius: 2,
        borderRadius: 4,
        backgroundColor: '#ECF0F3',
        borderWidth: 1,
        borderColor: '#ffffff',
        justifyContent: 'center',
        marginBottom: 20,
        alignItems: 'center',
        borderRadius: 100,
        overflow: 'hidden'
    },
    mapIcon: {
        height: 15,
        width: 15,
    },
    marker: {
        width: 20,        
    }
})