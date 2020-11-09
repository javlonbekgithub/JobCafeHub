import React, { useState } from 'react'
import { Header } from './../../components/header'
import { lang, setRegData, regData } from './../../store'
import { View, StyleSheet, ScrollView } from 'react-native'
import { ButtonCustom } from '../../components/button-custom'
import { observer } from 'mobx-react'
import { GenderPhotoSpec } from '../../components/genderPhotoSpec'



export const RegistrationNext = observer(({navigation}) => {

    const [gender, setGender] = useState(1)

    const [master, setMaster] = useState(0)
    
    const handleNext = () => {
        setRegData({
            gender: gender,
            master: master
        })
        console.log(JSON.stringify(regData,null,2))
        navigation.navigate('PointLocation')
    }

    return (
        <View style = {styles.cont}>
            <Header
                onPress = {() => navigation.goBack() }
                title = {lang.registration.title}
            />
            <ScrollView
                contentContainerStyle={styles.scrollViewCont}
                centerContent = {true}
            >
                <GenderPhotoSpec
                    gender = {gender}
                    master = {master}
                    setGender = {(value) => setGender(value)}
                    setMaster = {(value) => setMaster(value)}
                />
                <View style = {styles.buttonCont}>
                    <ButtonCustom 
                        title = {lang.buttonTitles.next}
                        onPress = {handleNext}
                    />
                </View>
            </ScrollView>
        </View>
    )
})

const styles = StyleSheet.create({
    cont: {
        backgroundColor: '#F0F2F6',
        padding: 10,        
    },
    scrollViewCont: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 70,
        zIndex: -5,
        // backgroundColor: 'red',
        paddingBottom: 140,
        
    },
    buttonCont: {
        width: '100%',
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'center',
    }
})