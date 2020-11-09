import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView, Dimensions,} from 'react-native'
import { ButtonCustom } from '../../components/button-custom'
import { lang } from '../../store';
import { Header } from './../../components/header/index'

export const Information = observer(({navigation}) => {

    const [activeButton, setActiveButton] = useState({
        worker: true,
        jobGiver: false
    })

    return (
        <View style = {styles.cont}>
            <View style = {styles.headerCont}>
                <Header
                    onPress = {navigation.goBack}
                    title = {lang.information.Headertitle}
                />
            </View>
            <ScrollView>
                <View style = {styles.buttonCont}>
                    <ButtonCustom 
                        title = {lang.drawerMenu.profileType.primary}
                        onPress = {() => setActiveButton({
                            worker: true,
                            jobGiver: false
                        })}
                        active = {activeButton.worker}
                    />
                    <ButtonCustom 
                        title = {lang.drawerMenu.profileType.secondary}
                        onPress = {() => setActiveButton({
                            worker: false,
                            jobGiver: true
                        })}
                        active = {activeButton.jobGiver}
                    />
                </View>
                <View style = {styles.titleCont}>
                    <Text style = {styles.title}>{lang.information.title}</Text>
                </View>
                <View style = {styles.stepsCont}>
                    {lang.information.steps.map((item, i) => (
                        <View key = {i} style = {(activeButton.jobGiver && (item.jobGiver === '')) ? styles.hide : styles.stepsItem}>
                            <Text style = {styles.stepName}>{activeButton.jobGiver ? item.jobGiver : item.worker}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
})

const styles = StyleSheet.create({
    cont: {
        backgroundColor: '#F0F2F6',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
    },
    headerCont: {
        paddingTop: 10,
        paddingHorizontal: 10
    },
    buttonCont: {
        width: '100%',
        marginTop: 20,
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    titleCont: {
        // backgroundColor: '#d7d8da',
        paddingHorizontal: 20,
        width: '100%',
        paddingVertical: 30
    },
    title: {
        fontSize: 25,
        color: '#21243D',
        fontWeight: 'bold',
    },
    stepsCont: {
        width: '100%',
    },
    stepsItem: {
        width: Dimensions.get('window').width - 20,
        padding: 20,
        margin: 10,
        backgroundColor: '#F0F2F6',
        flexDirection: 'row',
        borderWidth: 2.5,
        borderRadius: 8,
        alignItems: 'center',
        borderTopColor: '#ffffff80',
        borderLeftColor: '#ffffff80',
        borderRightColor: '#d7d8da80',
        borderBottomColor: '#d7d8da80'
    },
    stepName: {
        color: '#3391FF',
    },
    agreement: {
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20
    },
    agreementText: {
        marginLeft: 40,
    },
    hide: {
        display: 'none'
    }
})