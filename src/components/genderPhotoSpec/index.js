import React, { useState } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import man from '../../assets/icons/manBig.png'
import woman from '../../assets/icons/womanBig.png'
import ellipseNotPressed from '../../assets/icons/ellipseNotPressed.png'
import ellipsePressed from '../../assets/icons/ellipsePressed.png'
import photoUploadCont from '../../assets/icons/photoUploadCont.png'
import camera from '../../assets/icons/camera.png'
import tick from '../../assets/icons/tick.png'
import arrowDown from '../../assets/icons/arrowDown.png'
import checkNot from '../../assets/icons/checkNot.png'
import checked from '../../assets/icons/checked.png'
import photoBackground from '../../assets/icons/photoBackground.png'
import photoUploaderUser from '../../assets/img/photoUploaderUser.png'
import { ButtonCustom } from '../../components/button-custom'
import InsetShadow from 'react-native-inset-shadow'
import { observer } from 'mobx-react'
import { cameraLaunch, imageGalleryLaunch } from './../../helper-functions/index';
import { lang, specList, setRegData, regData, photosUri } from './../../store'

let whichPhoto = undefined



const GenderPhotoSpecIn = observer(props => {

    const [popUp, setPopUp] = useState(false)

    const [selectedSpecIdsForNewUserLocal, setSelectedSpecIdsForNewUserLocal] = useState(regData.specializations)
    
    const [specListView, setSpecListView] = useState(false)

    const openPopUp = id => {
        whichPhoto = id
        setPopUp(true)
    }
  
    const selectGender = id => props.setGender(id)

    const photoUploadLocal = cameraPressed => {
        console.log(cameraPressed)
        if (cameraPressed) {
            cameraLaunch(whichPhoto)
        } else {
            imageGalleryLaunch(whichPhoto)
        }
        setPopUp(false)
    }

    const handleSelectSpec = master => {
        props.setMaster(master)
    }

    const selectSpec = id => {
        if( selectedSpecIdsForNewUserLocal.includes(id)) {
            const tmp = selectedSpecIdsForNewUserLocal.filter(item => item !== id)
            setSelectedSpecIdsForNewUserLocal(tmp)
            setRegData({
                specializations: [ ...tmp]
            })
        } else {
            setSelectedSpecIdsForNewUserLocal([...selectedSpecIdsForNewUserLocal, id])
            setRegData({
                specializations: [...regData.specializations, id]
            })
        }
    }

    const handleSpecListOpen = () => setSpecListView(!specListView)

    return (
        <View
            style = {styles.cont}
        >
            {!props.portfolio && <View style = {styles.genderIconsCont}>
                <TouchableOpacity
                    style = {styles.genderIconsContItem}
                    onPress = {() => selectGender(1)}
                >
                    <View style = {styles.circle}>
                        <Image
                            style = {styles.ellipse}
                            source = {props.gender === 1 ? ellipsePressed : ellipseNotPressed}
                            resizeMode = 'contain'
                        />
                        <Image
                            style = {styles.genderIcon}
                            source = {man}
                            resizeMode = 'contain'
                        />
                    </View>
                    <Text>{lang.registration.genderText.man}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.genderIconsContItem}
                    onPress = {() => selectGender(2)}
                >
                    <View style = {styles.circle}>
                        <Image
                            style = {styles.ellipse}
                            source = {props.gender === 2 ? ellipsePressed : ellipseNotPressed}
                            resizeMode = 'contain'
                        />
                        <Image
                            style = {styles.genderIcon}
                            source = {woman}
                            resizeMode = 'contain'
                        />
                    </View>
                    <Text>{lang.registration.genderText.woman}</Text>
                </TouchableOpacity>
            </View>}
            <View style = {styles.photoUploaderConatiner}>
                <View style = {styles.photoUploaderConatinerItems}>
                    <Image
                        source = {photoUploadCont}
                        style = {styles.photoUploadCont}
                        resizeMode = 'contain'
                    />
                    <View style = {styles.cameraCont}>
                        <Image
                            source = {camera}
                            style = {styles.camera}
                            resizeMode = 'contain'
                        />
                    </View>
                    {!photosUri.user ? <Image
                        style = {styles.photoBackground}
                        source = {photoUploaderUser}
                        resizeMode = 'contain'
                    /> : <Image
                        style = {styles.photoUri}
                        source = {{ uri: photosUri.user }}
                        resizeMode = 'cover'
                    />}
                    <Text 
                        style = {styles.touchableAbsolute}
                        onPress = {() => openPopUp(0)}
                    ></Text>
                    <Text style = {styles.photoText}>{lang.registration.photoText.primary}</Text>
                </View>
                <View style = {styles.photoUploaderConatinerItems}>
                    <Image
                        source = {photoUploadCont}
                        style = {styles.photoUploadCont}
                        resizeMode = 'contain'
                    />
                    <View style = {styles.cameraCont}>
                        <Image
                            source = {camera}
                            style = {styles.camera}
                            resizeMode = 'contain'
                        />
                    </View>
                    {!photosUri.passport ? <Image
                        style = {styles.photoBackground}
                        source = {photoBackground}
                        resizeMode = 'contain'
                    /> : <Image
                        style = {styles.photoUri}
                        source = {{ uri: photosUri.passport }}
                        resizeMode = 'cover'
                    />}
                    <Text 
                        style = {styles.touchableAbsolute}
                        onPress = {() => openPopUp(1)}
                    ></Text>
                    <Text style = {styles.photoText}>{lang.registration.photoText.secondary}</Text>
                </View>
            </View>
            <View style = {popUp ? styles.popUpCont : styles.hide}>
                <View style = {styles.uploaderPopUp}>
                    {/* <TouchableOpacity */}
                    {/* > */}
                        {/* <View> */}
                            <ButtonCustom
                                onPress = {() => photoUploadLocal(true)}
                                title = {lang.registration.photoText.camera}
                            />
                        {/* </View> */}
                    {/* </TouchableOpacity> */}
                    {/* <TouchableOpacity */}
                    {/* > */}
                        {/* <View> */}
                            <ButtonCustom
                                onPress = {() => photoUploadLocal(false)}
                                title = {lang.registration.photoText.gallery}
                            />
                        {/* </View> */}
                    {/* </TouchableOpacity> */}
                </View>
                {/* <Text style = {styles.popUpBackgound} onPress = {() => setPopUp(false)}></Text> */}
            </View>
            <View style = {styles.checkBoxCont}>
                <TouchableOpacity 
                    style = {styles.checkBoxTouchable}
                    onPress = {() => handleSelectSpec(0)}
                >
                    <View style = {styles.tickCont}>
                        <Image
                            style = {styles.checkBox}
                            resizeMode = 'contain'
                            source = {(props.master === 0) ? checked : checkNot}
                        />
                        <Image
                            style = {(props.master === 0) ? styles.tick : styles.hide}
                            resizeMode = 'contain'
                            source = {tick}
                        />
                    </View>
                    <Text style = {styles.checkBoxText}>{lang.workerTabs.dailyWorker}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {styles.checkBoxTouchable}
                    onPress = {() => handleSelectSpec(1)}
                >
                    <View style = {styles.tickCont}>
                        <Image
                            style = {styles.checkBox}
                            resizeMode = 'contain'
                            source = {(props.master === 1) ? checked : checkNot}
                        />
                        <Image
                            style = {(props.master === 1) ? styles.tick : styles.hide}
                            resizeMode = 'contain'
                            source = {tick}
                        />
                    </View>
                    <Text style = {styles.checkBoxText}>{lang.workerTabs.master}</Text>
                </TouchableOpacity>
            </View>
            <View style = {(props.master === 1) ? styles.selecSpecCont : styles.hide}>
                <TouchableOpacity
                    onPress = {handleSpecListOpen}
                >
                    <View style = {styles.selectSpecInputCont}>
                        <InsetShadow
                            bottom = {false}
                            right = {false}
                            shadowRadius = {500}
                            elevation = {4}
                            containerStyle = {styles.insetShadow}
                        >
                            <Text 
                                style = {styles.selectSpec}
                            >
                                {lang.blank.specialization}
                            </Text>
                            
                        </InsetShadow>
                        <Image
                            style = {styles.arrowDown}
                            resizeMode = 'contain'
                            source = {arrowDown}
                        />
                    </View>
                </TouchableOpacity>
                <View style = {specListView ? styles.specListCont : styles.hide}>
                    {specList.map((item, i) => (
                        <TouchableOpacity
                            key = {i}
                            onPress = {() => selectSpec(item.id)}
                        >
                            <View style = {styles.specListItem}>
                                <Text style = {styles.specListItemText}>{lang.active === 'ru' ? item.title : item.slug}</Text>
                                <View style = {styles.ticksCont}>
                                    <Image
                                        style = {styles.checkBoxes}
                                        resizeMode = 'contain'
                                        source = {(props.master === 1) ? checked : checkNot}
                                    />
                                    <Image
                                        style = {selectedSpecIdsForNewUserLocal.includes(item.id) ? styles.ticks : styles.hide}
                                        resizeMode = 'contain'
                                        source = {tick}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    )
})

export const GenderPhotoSpec = React.memo(GenderPhotoSpecIn)

const styles = StyleSheet.create({
    cont: {
        alignItems: 'center',
        width: '100%',
    },
    genderIconsCont: {
        marginBottom: 50,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    genderIconsContItem: {
        alignItems: 'center',
    },
    circle: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    ellipse: {
        width: 80,
    },  
    genderIcon: {
        position: 'absolute',
        width: 25
    },
    photoUploaderConatiner: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        // padding: 10,
        marginBottom: 60,
        
    },
    photoUploaderConatinerItems: {
        flex: 1,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 5
        overflow: 'hidden',
        position: 'relative',
    },
    photoUploadCont: {
        width: '90%',
        height: 112,
        // backgroundColor: 'yellow'
    },
    cameraCont: {
        backgroundColor: '#F0F2F6',
        position: 'absolute',
        paddingVertical: 0,
        paddingHorizontal: 12,
        borderWidth: 2,
        zIndex: 3,
        borderRadius: 8,
        borderColor: '#fff'
    },
    camera: {
        width: 20,
    },
    photoBackground: {
        position: 'absolute',
        width: 260,
        zIndex: 2,
        height: 80,
        // backgroundColor:'red',
        borderRadius: 4
    },
    photoUri: {
        position: 'absolute',
        width: '90%',
        zIndex: 2,
        height: 112,
        // backgroundColor:'red',
        borderRadius: 4
    },
    photoText: {
        position: 'absolute',
        top: '100%'
    },
    touchableAbsolute: {
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
        height: '100%',
        zIndex: 6  
    },
    popUpCont: {
        // position: 'absolute',
        width: '100%',
        // height: 300,
        // backgroundColor: 'red',
        // top: -60,
        // zIndex: 8,
        // left: 0,
        // right: 0,
        // bottom: 0,
        marginBottom: 40,
        
        // alignItems: 'center',
        // justifyContent: 'center',
        // flex: 1,
        alignSelf: 'center'
    },
    uploaderPopUp: {
        // position: 'absolute',
        zIndex: 3546,
        width: '100%',
        flexDirection: 'row',
        // height: 200,
        // padding: 20,
        justifyContent: 'space-between',
        
        alignSelf: 'center',
        
        // zIndex: 865,
        // justifyContent: 'space-evenly',
        // backgroundColor: '#F0F2F6',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 2,
        //     height: 20,
        // },
        // shadowOpacity: 0.9,
        // elevation: 5,
        // borderRadius: 4,
        // borderWidth: 2,
        // borderColor: '#fff'
    },
    popUpBackgound: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: -220,
        alignSelf: 'center',
        // width: '100%',
        // height: '100%',
        // height: Dimensions.get('screen').height,
        // backgroundColor: '#F0F2F650',
        zIndex: 35
    },
    checkBoxCont: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    checkBoxTouchable: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    checkBox: {
        width: 30,
    },
    checkBoxText: {
        textTransform: 'capitalize',
        color: '#21243D'
    },
    tickCont: {
        marginRight: 20,
    },
    tick: {
        position: 'absolute',
        left: 10,
        top: 45,
        width: 10,
    },
    selecSpecCont: {
        marginTop: 20,
        width: 280,
        // justifyContent: 'center',
    },
    selectSpecInputCont: {
        justifyContent: 'center',
    },
    insetShadow: {
        height: 'auto',
        borderRadius: 4,
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10
    },
    selectSpec: {
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
    arrowDown: {
        position: 'absolute',
        width: 20,
        right: 10,
        alignSelf: 'flex-end'
    },
    specListCont: {
        backgroundColor: '#F0F2F6',
        padding: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -10
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 2,
        borderRadius: 4,
        borderColor: '#fff',
        borderWidth: 1
    },
    specListItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(33, 36, 61, 0.1)'
    },
    specListItemText: {
        color: '#21243D',
    },
    ticksCont: {
        height: 20,
        // backgroundColor: 'red'
    },
    checkBoxes: {
        width: 20,
        height: 20,
    },
    ticks: {
        position: 'absolute',
        left: 5,
        top: 5,
        width: 10,
    },
    buttonCont: {
        width: '100%',
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hide: {
        display: 'none'
    },
})