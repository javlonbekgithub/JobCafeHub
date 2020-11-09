import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { Neomorph } from 'react-native-neomorph-shadows'
import markerWoman from '../../assets/icons/markerWoman.png'
import marker from '../../assets/icons/marker.png'
import noAva from '../../assets/icons/manBig.png'
import star from '../../assets/icons/yellowStar.png'
import { lang } from '../../store'
import { observer } from 'mobx-react'


const UserListSingleIn = observer(props => {
   
    const { distance } = props.datum

    return (
        <TouchableOpacity
            {...props}
            style = {styles.userListItem}
        >
            <View style = {styles.userListItemLeft}>
                <Neomorph
                    lightShadowColor = "#FFF" // <- this// <- change zIndex of each shadow color
                    darkShadowColor = "#000" // <- set this
                    style = {styles.userAvaCont}
                >
                    <Image
                        style = {!props.datum.image ? styles.userAva : styles.fullAva}
                        resizeMode = {!props.datum.image ? 'contain' : 'cover'}
                        source = {props.datum.image ? {
                            uri: props.datum.image.small
                        } : noAva}
                    />
                </Neomorph>
                <View style = {styles.workerInfo}>
                    <Text style = {styles.name}>
                        {`${props.datum.first_name} ${props.datum.last_name}`}
                    </Text>
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
            </View>
            <View style = {styles.userListItemRight}>
                <View style = {styles.distanceCont}>
                    <Image
                        source = {props.datum.gender === 1 ? marker : markerWoman}
                        style = {styles.markerMini}
                        resizeMode = 'contain'
                    />
                    {distance && <Text style = {styles.distance}>{(distance / 1000 > 1) ? `${(distance / 1000).toString().slice(0, 5)} ${lang.distance.km}`:`${(distance).toString().slice(0, 3)} ${lang.distance.m}`}</Text>}
                </View>
                <Text style = {styles.spec}>
                    {!(props.datum.specializations.length > 0) ? lang.workerTabs.dailyWorker : props.datum.specializations[0].title}
                </Text>
            </View>
        </TouchableOpacity>
    )
})

export const UserListSingle = React.memo(UserListSingleIn)

const styles = StyleSheet.create({
    userListItem: {
        width: '100%',
        alignItems: 'center',
        borderBottomColor: 'rgba(33, 36, 61, 0.1)',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 20
    },
    userListItemLeft: {
        flexDirection: 'row',
    },
    userAvaCont: {
        width: 70,
        height: 70,
        shadowOffset: {
            width: 1.2, 
            height: 1.5
        },
        shadowOpacity: 0.1, // <- and this or yours opacity
        shadowRadius: 2,
        borderRadius: 4,
        backgroundColor: '#ECF0F3',
        borderWidth: 1,
        borderColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        overflow: 'hidden',
    },
    userAva: {
        height: 20,
        width: 20,
    },
    fullAva: {
        height: 67,
        borderRadius: 500,
        width: 67,
    },
    workerInfo: {
        justifyContent: 'space-around',
        marginLeft: 20,
    },
    name: {
        color: '#21243D',
        textTransform: 'capitalize'
    },
    rateCont: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rateStar: {
        flexDirection: 'row',
        marginLeft: 10,
        top: 2
    },
    star: {
        width: 15,
        height: 15
    },
    userListItemRight: {
        alignItems: 'flex-end'
    },
    markerMini: {
        width: 30,
        height: 30
    },
    distanceCont: {
        flexDirection: 'row'
    },
    distance: {
        marginLeft: 5,
        color: 'rgba(33, 36, 61, 0.5)',
    },
    spec: {
        textTransform: 'capitalize',
        color: '#21243D'        
    }
})