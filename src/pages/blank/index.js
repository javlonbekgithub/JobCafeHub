import React,{ useState, useCallback } from 'react'
import { StyleSheet, View, Text, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { Ellipse } from '../../components/ellipse'
import { Header } from '../../components/header'
import { Neomorph } from 'react-native-neomorph-shadows'
import { lang, selectedWorkerGlobal } from '../../store'
import stars from '../../assets/img/stars.png'
import call from '../../assets/icons/call.png'
import ImageView from 'react-native-image-view'
import Draggable from 'react-native-draggable'
import InsetShadow from 'react-native-inset-shadow'
import star from '../../assets/icons/yellowStar.png'
import { dialCall } from '../../helper-functions'
import { observer } from 'mobx-react'

const screenWidth = Dimensions.get('screen').width

export const Blank = observer((props) => {

    console.log(JSON.stringify(selectedWorkerGlobal,null,2))

    let images = []

    selectedWorkerGlobal.portfolio.map((item) => {
        images = [...images, {
            source: {
                uri: item.medium,
            }
        }]
    })
    
    const [imageView, setImageView] = useState(false)

    const [imageViewIndex, setImageViewIndex] = useState(0)

    const openPhoto = index => {
        setImageViewIndex(index)
        setImageView(true)
    }

    const goBack = useCallback(()  => props.navigation.navigate('Home'), [])

    return (
        <View style = {styles.cont}>
            <Header
                title = {lang.blank.title}
                onPress = {goBack}
            />
            <ScrollView
                contentContainerStyle={styles.scrollViewCont}
                centerContent = {true}
                >
                <Top/>
                <View style = {styles.gridCont}>
                    {selectedWorkerGlobal.portfolio.map((item, i) => (<TouchableOpacity
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
                        </TouchableOpacity>))}
                    <ImageView
                        animationType = 'slide'
                        images={images}
                        imageIndex={imageViewIndex}
                        isVisible={imageView}
                        onClose = {() => setImageView(false)}
                    />
                </View>
            </ScrollView>
            <Call/>
        </View>
    )
})

const Top = React.memo(observer(() => {
    console.log('top')
    return (
        <View style = {styles.top}>
            <Ellipse
                signed
                image = {selectedWorkerGlobal.image && selectedWorkerGlobal.image.medium}
            />
            <Text style = {styles.name}>{selectedWorkerGlobal.first_name} {selectedWorkerGlobal.last_name}</Text>
            <Text style = {styles.telephone}>{selectedWorkerGlobal.phone}</Text>
            <Text style = {styles.telephone}>{selectedWorkerGlobal.age} {lang.workerTexts.age}</Text>
            <Image 
                style = {styles.stars}
                source = {stars}
                resizeMode = 'contain'
                />
            <View
                style = {styles.infoCont}
            >
                <View style = {styles.infoTop}>
                    <Text style = {styles.telephone}>{lang.blank.contact}:</Text>
                    {/* <Text style = {styles.specText}>4.2</Text> */}
                    <View style = {styles.rateCont}>
                        <Text style = {styles.name}>4.5</Text>
                        <View style = {styles.rateStar}>
                            <Image 
                                style = {styles.star}
                                resizeMode = 'contain'
                                source = {star}
                            />
                            <Image 
                                style = {styles.star}
                                resizeMode = 'contain'
                                source = {star}
                            />
                            <Image 
                                style = {styles.star}
                                resizeMode = 'contain'
                                source = {star}
                            />
                            <Image 
                                style = {styles.star}
                                resizeMode = 'contain'
                                source = {star}
                            />
                            <Image 
                                style = {styles.star}
                                resizeMode = 'contain'
                                source = {star}
                            />
                        </View>
                    </View>
                </View>
                <View style = {styles.infoLeft}>
                    <Text style = {styles.telephone}>{lang.blank.specialization}:</Text>
                    <View>
                        {!(selectedWorkerGlobal.specializations.length > 0) ? <Text style = {styles.specText}>{ lang.workerTabs.dailyWorker }</Text> :
                            selectedWorkerGlobal.specializations.map((item, i) => (
                            <Text key = {i} style = {styles.specText}>{(lang.active === 'ru') ? item.title : item.slug}</Text>
                            ))
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}))

const Call = React.memo(() => {
    console.log('calll')

    const maxX = 280

    const dragEnd = screenWidth - ((screenWidth - maxX))
    // const state = {
    //     duration: 5000,
    //     pattern: [1000, 2000, 1000, 2000]

    // }

    const dragRelease = ({nativeEvent}) => {
        if (nativeEvent.pageX > dragEnd) {
            dialCall(selectedWorkerGlobal.phone)
            // Vibration.vibrate(state.duration)
        }
    }

    const drag = ({nativeEvent}) => {
        // console.log(nativeEvent)
    }

    return (
        <View style = {styles.callMainCont}>
            <Neomorph
                inner
                lightShadowColor = "#fff0f0" // <- this// <- change zIndex of each shadow color
                darkShadowColor = "#000" // <- set this
                style = {styles.callCont}
            >
                <Draggable 
                    // x={75} 
                    // y={100} 
                    minY = {0} 
                    maxY = {0}          
                    maxX = {maxX}
                    minX = {0} 
                    touchableOpacityProps = {1} 
                    renderSize={56} 
                    renderColor='transparent' 
                    isCircle 
                    shouldReverse
                    onDragRelease = {dragRelease}
                    onDrag = {drag}
                    // onDragRelease = {() => dialCall(selectedWorkerGlobal.phone)}
                >
                    <View style = {styles.callIconCont}>
                        <Image
                            resizeMode = 'contain'
                            style = {styles.callIcon}
                            source = {call}
                        />
                    </View>    
                    <View style = {styles.greenDraggable}></View>

                </Draggable> 
                <Text style = {styles.callText}>{lang.blank.contact}</Text>
            </Neomorph>
        </View>
    )
})

const styles = StyleSheet.create({
    cont: {
        padding: 10
    },
    scrollViewCont: {
        width: '100%',
        zIndex: -2000,
        paddingBottom: 150,
    },
    top: {
        width: '100%',
        marginTop: 30,
        alignItems: 'center',
    },
    name: {
        color: '#21243D',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    telephone: {
        fontSize: 14,
        marginBottom: 5,
        color: '#21243D50',
    },
    stars: {
        width: 200,
    },
    infoCont: {
        shadowOffset: {
            width: 0.5, 
            height: 0.7
        },
        shadowOpacity: 0.0, // <- and this or yours opacity
        shadowRadius: 200,
        elevation: 1.9,
        borderRadius: 4,
        backgroundColor: '#ECF0F3',
        width: screenWidth - 20,
        // height: 120,
        marginBottom: 5,
        // flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ffffff',
        alignItems: 'center',
        padding: 20
    },
    infoTop: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',   
    },
    infoLeft: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',   
    },
    specText: {
        marginBottom: 5,
        color: '#21243D'
    },
    name: {
        color: '#21243D',
        textTransform: 'capitalize'
    },
    rateCont: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    rateStar: {
        flexDirection: 'row',
        marginLeft: 10,
        top: 2
    },
    star: {
        width: 20,
        height: 20
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
        height: screenWidth / 3 - 10,
        borderRadius: 7,
        marginVertical: 3
    },
    insideBorder: {
        width: screenWidth / 3 - 10,
        height: screenWidth / 3 - 10,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 7,
    },
    callMainCont: {
        position: 'absolute',
        top: '80%',
        alignSelf: "center",
        zIndex: 1
    },
    callCont: {
        shadowOffset: {
            width: 1.2, 
            height: 1.5
        },
        shadowOpacity: 0.12, // <- and this or yours opacity
        shadowRadius: 2,
        width: 280,
        height: 70,
        flexDirection: 'row',
        borderRadius: 100,
        backgroundColor: '#F0F2F6',
        zIndex: 200,
        position: 'relative',
        
        borderColor: '#fff',
        borderBottomWidth: 1,
        borderRightWidth: 1
    },
    greenDraggable: {
        height: 70,
        // width: 280,
        position: 'absolute',
        backgroundColor: '#50D890',
        // top: 70,
        zIndex: -1444444000,
        left: -245
        // right: '100%'
    },
    callIconCont: {
        flexDirection: 'row',
        // flex: 0,
        width: 70,
        padding: 15,
        borderRadius: 100,
        backgroundColor: '#50D890'
    },
    callIcon: {
        width: 40,
        height: 40
    },
    callText: {
        position: 'absolute',
        alignSelf: 'center',
        zIndex: -1,
        color: '#21243D',
        left: '40%'
    }
})