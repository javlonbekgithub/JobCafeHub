import React, { useCallback } from 'react'
import { View, Image, Text, StyleSheet, Dimensions, TouchableHighlight ,ScrollView, TouchableOpacity } from 'react-native'
import { Ellipse } from './../ellipse/'
import info from '../../assets/icons/info.png'
import support from '../../assets/icons/support.png'
import profileIcon from '../../assets/icons/profile.png'
import exit from '../../assets/icons/exit.png'
import { ButtonCustom } from '../button-custom'
import arrow from '../../assets/icons/arrow3.png'
import { lang, setLang } from './../../store/index';
import { observer } from 'mobx-react'
import { dialCall, navigate } from './../../helper-functions/index';

const TopIn = observer(({user, closeDrawer, signInAsJobGiver, signInAsWorker, exitProfile}) => {
    console.log('draweer')
    
    const goToProfile = useCallback(() => {
        navigate('Profile')
    }, [])

    return (
        <>
            <View style = { styles.drawerTop }>
                <TouchableHighlight 
                    underlayColor = '#ffffff00'
                    style = {styles.arrowCont}
                    // rippleCentered = {true}
                    onPress = {closeDrawer}
                >
                    <Image 
                        style = {styles.arrow}
                        resizeMode = 'contain'
                        source = { arrow }
                    />
                </TouchableHighlight>
                <Ellipse
                    signed = {(user.message === 'success') ? true : false}
                    image = {(user.message === 'success' && user.data.image) && user.data.image.medium}
                />
                <Text style = {(user.message === 'success') ? styles.name : styles.idText}>
                    {!(user.message === 'success') ? lang.drawerMenu.enter : `${user.data.first_name}  ${user.data.last_name}`}
                </Text>
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollViewCont}
                centerContent = {true}
            >
                {((user.message === 'success') && (user.data.status === 10)) && <View style = {styles.userInfo}>
                    <View style = {styles.idCont}>
                        <Text style = {styles.idText}>{`ID:${user.data.id}`}</Text>
                    </View>
                    <View style = {styles.balanceCont}>
                        <Text style = {styles.idText}>{`${lang.drawerMenu.balance}:`}</Text>
                        <Text style = {styles.idText}>{`${user.data.balance} ${lang.drawerMenu.currency}`}</Text>
                    </View>
                </View>} 
                {((user.message === 'success') && (user.data.type === 2)) && <View style = {styles.userInfo}>
                    <View style = {styles.idCont}>
                        <Text style = {styles.idText}>{`ID:${user.data.id}`}</Text>
                    </View>
                </View>} 
                {((user.message === 'success') && (user.data.status === 9) && (user.data.type === 3)) && <Text style = {styles.blankIsChecking}>{lang.drawerMenu.blankIsChecking}</Text>}
                {!(user.message === 'success') && <View style = {styles.buttonCont}>
                    <ButtonCustom 
                        title = {lang.drawerMenu.profileType.primary}
                        // helperStyle = {styles.buttons}
                        drawer
                        // active = {activeButton.worker}
                        onPress = {signInAsWorker}
                    />
                    <ButtonCustom 
                        title = {lang.drawerMenu.profileType.secondary}
                        // helperStyle = {styles.buttons}
                        drawer
                        // active = {activeButton.jobGiver}
                        onPress = {signInAsJobGiver}
                    />
                </View>
                }
                <View style = {styles.infoSupportCont}>
                    {(user.message === 'success') && <TouchableOpacity  onPress = {goToProfile}>
                        <View style = {styles.infoSupportItems}>
                            <Image resizeMode = 'contain' style = {styles.textIcon} source = {profileIcon}/>
                            <Text style = {styles.idText}>{lang.drawerMenu.profile}</Text>
                        </View>
                    </TouchableOpacity>}
                    <TouchableOpacity
                        onPress = {() => navigate('Information')}      
                    >
                        <View style = {styles.infoSupportItems}>
                            <Image resizeMode = 'contain' style = {styles.textIconInfo} source = {info}/>
                            <Text style = {styles.idText}>{lang.drawerMenu.info}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress = {() => dialCall('+998712026868')}
                    >
                        <View style = {styles.infoSupportItems}>
                            <Image resizeMode = 'contain' style = {styles.textIcon} source = {support}/>
                            <Text style = {styles.idText}>{lang.drawerMenu.support}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style = {styles.drawerBottom}>
                {(user.message === 'success') && <TouchableOpacity onPress = {exitProfile}>
                        <View style = {styles.exitCont}>
                            <Image resizeMode = 'contain' style = {styles.textIcon} source = {exit}/>
                            <Text style = {styles.idText}>{lang.drawerMenu.exit}</Text>
                        </View>
                    </TouchableOpacity>}
                <View style = {styles.languages}>
                    <Text onPress = {() => setLang('ru')} style = {(lang.active === 'ru') ? styles.active : styles.languagesText}>{lang.drawerMenu.languages.ru}</Text>
                    <Text onPress = {() => setLang('uz')} style = {(lang.active === 'uz') ? styles.active :styles.languagesText}>{lang.drawerMenu.languages.uz}</Text>
                </View>
            </View>
        </>
    )
}) 

export const TopDrawer = React.memo(TopIn)

const styles = StyleSheet.create({
    drawerTop: {
    //    padding: 10,
        marginTop: 30,
        flexDirection: 'column',
        alignItems: 'center',
    },
    arrowCont: {
        paddingBottom: 50,
        paddingLeft: 50,
        position: 'absolute',
        left: 10,
        top: -30,
        
    },
    arrow: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 20,
        left: 20
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#21243D',
        lineHeight: 19,
        marginBottom: 25,
    },

    idText: {
        color: '#21243D'
    },    
    scrollViewCont: {
        paddingHorizontal: 20,
        width: '100%',
        paddingBottom: 20,
        
    },
    userInfo: {
        width: '100%',
        borderWidth: 1,
        // marginHorizontal: 20,
        borderRadius: 10,
        borderColor: '#fff',
        marginBottom: 30,
    },
    idCont: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    idText: {
        color: '#21243D'
    },
    balanceCont: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    blankIsChecking: {
        color: '#FF6767',
        width: '100%',
        marginBottom: 20,
        textAlign: 'center'
    },
    buttonCont: {
        alignSelf: 'center',
        width: '100%',
        flexDirection: 'row',
        marginVertical: 20,
        // paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    buttons: {
        // paddingTop: 28,
        paddingVertical: 50,
        // lineHeight: 15,
        height: 70,
        // fontSize: 14,
        padding: 0,
        maxWidth: 200,
        // flex: 1,
        // width: Dimensions.get('screen').width * 0.85 / 2 - 15,
        marginTop: 0,
        // color: '#000',
        justifyContent: 'center',
        color: '#000'
        
    },
    infoSupportItems: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2,
    },
    textIcon: {
        width: 20,
        marginRight: 10,
    },
    textIconInfo: {
        width: 10,
        marginRight: 20
    },
    drawerBottom: {
        flexDirection: 'column',
        width: '100%',
    },
    exitCont: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    languages: {
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    languagesText: {
        marginRight: 20,
        color: '#21243D'
    },
    active: {
        marginRight: 20,
        color: '#3391FF'
    }

})