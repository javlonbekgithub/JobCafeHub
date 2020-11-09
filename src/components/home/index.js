import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Image, View, Text, BackHandler, Keyboard } from 'react-native'
import noAva from '../../assets/icons/manBig.png'
import workersMap from '../../assets/icons/workersMap.png'
import earthMap from '../../assets/icons/earthMap.png'
import { ButtonCustom } from '../button-custom'
import { lang, setSelectedWorkerGlobal, specList, setSpecList, selectedWorkerGlobal, location, genderFilter, setGenderFilter, activeButton, setActiveButton, setLocation } from '../../store/index'
import { Neomorph } from 'react-native-neomorph-shadows'
import { Api, usersNearby, dailyWorkerApi, specializationsListApi, pageNumberApi, genderFilterApi, searchApi, perPageApi, specArrApi, json } from '../../api'
import { dialCall } from '../../helper-functions'
import { observer } from 'mobx-react'
import { MapCustom } from './../map-custom/index'
import Ripple from 'react-native-material-ripple'
import { Loading } from '../loading'
import { UserList } from '../user-list'
import { HomeHeader } from './home-header'


let pageNumber = 1

let tmpUsers = []

let backButton = 0

const quantityWorkers = '15'

const quantityWorkersForMoreUser = '5'

export const Home = observer((props) => {
    useEffect(() => {
        getNearbyUsers(location.latitude, location.longitude)
        getSpecList()
        const backAction = () => {
            if (props.route.name === 'Home') {
                backButton = backButton + 1 
                setTimeout(() => {
                    backButton = 0 
                }, 2000)
                if (backButton >= 2) {
                    backButton = 0
                    return false
                } else {
                    setSearch(false)
                    setSearchValue('')
                    setMapView(true)
                    return true
                }  
            }
        }
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            )
        
            return () => backHandler.remove()
    }, [])

    const [workersList, setWorkersList] = useState(false)

    const [search, setSearch] = useState(false)

    const [searchValue, setSearchValue] = useState('')

    const [selectedSpec, setSelectedSpec] = useState('')

    const [mapView, setMapView] = useState(true)

    const [userList, setUserList] = useState([])

    const [miniInfo, setMiniInfo] = useState(false)

    const [loading, setLoading] = useState(false)
    
    const [enableScroll, setEnableScroll] = useState(false)


    const getMoreUser = async (pageNumberParam, selectedSpecParam = '?', search = false) => {
        let filterGender = ''
        if (genderFilter.value) {
            filterGender = `&${genderFilterApi}${genderFilter.value}`
        } else {
            filterGender = ''
            // console.log(`${searchApi}${searchValue}${pageNumberApi}${pageNumberParam}${perPageApi}${quantityWorkersForMoreUser}${filterGender}`)
        }
        if (!searchValue) {
            const getMoreRes = await Api(`${usersNearby.begin}${location.latitude}/${location.longitude}${selectedSpecParam}${usersNearby.end}${quantityWorkersForMoreUser}${filterGender}${pageNumberApi}${pageNumberParam}`)
            tmpUsers = [...userList, ...getMoreRes.data]
            setUserList(tmpUsers)
            console.log('withoutSearch', `${usersNearby.begin}${location.latitude}/${location.longitude}${selectedSpecParam}${usersNearby.end}${quantityWorkersForMoreUser}${filterGender}${pageNumberApi}${pageNumberParam}`)

            // console.log(JSON.stringify(getMoreRes,null,2))
        } else {
            const getSearchRes = await Api(`${searchApi}${searchValue}${pageNumberApi}${pageNumberParam}${perPageApi}${quantityWorkersForMoreUser}${filterGender}${specArrApi}`)
            console.log('search:',`${searchApi}${searchValue}${pageNumberApi}${pageNumberParam}${perPageApi}${quantityWorkersForMoreUser}${filterGender}${specArrApi}`)
            tmpUsers = [...userList, ...getSearchRes.data]
            setUserList(tmpUsers)
        }
        // console.log(`${usersNearby.begin}${latitude}/${longitude}?${selectedSpecParam}${usersNearby.end}${quantityWorkers}${pageNumberApi}${pageNumberParam}`)
        // tmpUsers = [...userList, ...getMoreRes.data]
        // setUserList(tmpUsers)
    }

    const getNearbyUsers = async (lat, lon) => {
        let thirdParam = ''
        console.log('selectedSpec', selectedSpec)
        if (selectedSpec) {
            if (genderFilter.value) {
                thirdParam = `/${selectedSpec}?${genderFilterApi}${genderFilter.value}&`
            } else {
                thirdParam = `/${selectedSpec}?`
            }
        } else if (activeButton.dailyWorker){
            if (genderFilter.value) {
                thirdParam = `?${dailyWorkerApi}&${genderFilterApi}${genderFilter.value}&`
            } else {
                thirdParam = `?${dailyWorkerApi}&`
            }
        } else if (!selectedSpec && !activeButton.dailyWorker){
            if (genderFilter.value) {
                thirdParam = `?${genderFilterApi}${genderFilter.value}&`
            } else {
                thirdParam = '?'
            }
        } 
        console.log(`${usersNearby.begin}${lat}/${lon}${thirdParam}${usersNearby.end}${quantityWorkers}`)
        
        const nearUsers = await Api(`${usersNearby.begin}${lat}/${lon}${thirdParam}${usersNearby.end}${quantityWorkers}`)
        console.log(nearUsers.meta)
        setUserList(nearUsers.data)
    }

    const getSpecList = async () => {
        let specListFromServer = await Api(specializationsListApi)
        setSpecList(specListFromServer.data)
    }

    const openSearch = useCallback(async () => {
        setMiniInfo(false)
        if (!search) {
            setSearch(true)
        }
        if (search && !searchValue) {
            setSearch(false)
        } 
        if (search && searchValue) {
            Keyboard.dismiss()
            setLoading(true)
            console.log(`search: ${searchApi}${searchValue}${json}${specArrApi} `)
            const searchResult = await Api(`${searchApi}${searchValue}${json}${specArrApi} `)
            console.log(searchResult.meta)
            setUserList(searchResult.data)
            setSelectedSpec('')
            setWorkersList(false)
            setActiveButton({
                dailyWorker: false,
                proWorker: false
            }) 
            setMapView(false)
            setMiniInfo(false)
            setLoading(false)
            setEnableScroll(false)
        }
    },[search, searchValue, handleSetSearchValue, setSearch])

    const openWorkersList = useCallback(() => {
        setActiveButton({
            dailyWorker: false,
            proWorker: !activeButton.proWorker
        })
        setWorkersList(!workersList)
    },[setActiveButton, activeButton, workersList])

    const getSpecWorkers = useCallback(() => {
        console.log('getspec')
        setActiveButton({
            dailyWorker: false,
            proWorker: !activeButton.proWorker
        })
        setWorkersList(!workersList)
        getNearbyUsers(location.latitude, location.longitude )
        setSearch(false)
        setSearchValue('')
        pageNumber = 1
    },[activeButton, setActiveButton, workersList, selectedSpec, searchValue, search])

    const goToDailyWorkers = useCallback(() => {
        setMiniInfo(false)
        setActiveButton({
            dailyWorker: !activeButton.dailyWorker,
            proWorker: false
        })
        setWorkersList(false)
        setSelectedSpec('')
        pageNumber = 1
        getNearbyUsers(location.latitude, location.longitude)
        setSearch(false)
        setSearchValue('')
    },[setActiveButton, activeButton, search, searchValue])

    const selectSpec = useCallback(spec => {
        setMiniInfo(false)
        setEnableScroll(false)
        if (spec === selectedSpec) {
            setSelectedSpec('')
        } else {
            setSelectedSpec(spec)
        }
    }, [selectedSpec, setSelectedSpec])

    const getNewMarkers = useCallback(e => {
        setMiniInfo(false)
        const { latitude, longitude } = e
        setLocation(latitude, longitude)
        getNearbyUsers(latitude, longitude)
    },[selectedSpec])

    const contentChanger = useCallback(() => {
        setMiniInfo(false)
        setEnableScroll(false)
        setSelectedWorkerGlobal({})
        setMapView(!mapView)
    },[mapView])

    const handleScroll = useCallback(({ nativeEvent }) => {
        const { y } = nativeEvent.contentOffset
        const contentHeight = nativeEvent.contentSize.height
        const containerHeight = nativeEvent.layoutMeasurement.height
        if (parseInt(y) === parseInt((contentHeight - containerHeight))) {
            console.log('scrollend')
            setEnableScroll(true)
            pageNumber = pageNumber + 1
            if (selectedSpec) {
                // if (genderFilter.value)
                //     getMoreUser(pageNumber,`/${selectedSpec}?${genderFilterApi}${genderFilter.value}&`)
                // else
                getMoreUser(pageNumber,`/${selectedSpec}?`)
            } else if (activeButton.dailyWorker) {
                // if (genderFilter.value) 
                //     getMoreUser(pageNumber,`?${dailyWorkerApi}&${genderFilterApi}${genderFilter.value}&`)
                // else
                getMoreUser(pageNumber,`?${dailyWorkerApi}&`)
            } else if (!selectedSpec && !activeButton.dailyWorker) {
                // if (genderFilter.value) 
                //     getMoreUser(pageNumber,`?${genderFilterApi}${genderFilter.value}&`)
                // else
                getMoreUser(pageNumber)
            }
        }
    }, [userList, setEnableScroll, enableScroll])

    const openMiniInfo = useCallback((index) => {
        if(typeof index === 'number') {
            let number = index
            setMiniInfo(true)   
            console.log(number)
            setSelectedWorkerGlobal(userList[number])
        }
    },[userList])

    const handleSelectWorker = useCallback(index => {
        setSelectedWorkerGlobal(userList[index])
        props.navigation.navigate('Blank')
    },[userList, setSelectedWorkerGlobal])

    const handleGenderFilter = useCallback(index => {
        setGenderFilter(index)
        setEnableScroll(false)
        getNearbyUsers(location.latitude, location.longitude)
        pageNumber = 1
    },[setGenderFilter, genderFilter, selectedSpec])

    const handleSetSearchValue = useCallback((e) => {
        setSearchValue(e)
    },[searchValue, setSearchValue])

    const handleOpenDrawer = useCallback(() => {
        props.navigation.openDrawer()
    },[searchValue])

    const handleSetMiniInfo = useCallback(() => {
        setMiniInfo(false)
    },[miniInfo])

    return (
        <View style = {styles.mainCont}>
            <View style = { mapView ? styles.container : {...styles.container, ...styles.containerForList} }>
                <HomeHeader
                    search = {search}
                    searchValue = {searchValue}
                    openDrawer = {handleOpenDrawer}
                    handleGenderFilter = {handleGenderFilter}
                    handleSetSearchValue = {handleSetSearchValue}
                    openSearch = {openSearch}
                />
                {loading && <Loading/>}
                <View style = {styles.tabsCont}>
                    <ButtonCustom 
                        title = {lang.workerTabs.primary}
                        onPress = {goToDailyWorkers}
                        active = {activeButton.dailyWorker}
                    />
                    <ButtonCustom 
                        title = {lang.workerTabs.secondary}
                        onPress = {openWorkersList}
                        active = {activeButton.proWorker}
                    />
                </View>
                <WorkerList 
                    workersList = {workersList}
                    selectSpec = {selectSpec}
                    selectedSpec = {selectedSpec}
                    getSpecWorkers = {getSpecWorkers}
                />
            </View>
        <View style={styles.mapContainer}>
            <UserList
                userList = {userList}
                enableScroll = {enableScroll}
                mapView = {mapView}
                handleSelectWorker = {handleSelectWorker}
                handleScroll = {handleScroll}
            />
            {mapView && 
            <MapCustom
                onRegionChangeComplete = {getNewMarkers}
                onPress = {handleSetMiniInfo}
                onMarkerPress = {openMiniInfo}
                data = {userList}
            />
            }
            <View style = {(miniInfo && selectedWorkerGlobal) ? styles.miniInfo : styles.hide}>
                <View style = {styles.miniInfoTop}>
                    <View style = {styles.miniInfoTopLeft}>
                        <Neomorph
                            lightShadowColor = "#FFF" // <- this// <- change zIndex of each shadow color
                            darkShadowColor = "#000" // <- set this
                            style = {styles.userAvaCont}
                        >
                            <Image
                                style = {!selectedWorkerGlobal.image ? styles.userAva : styles.fullAva}
                                resizeMode = {!selectedWorkerGlobal.image ? 'contain' : 'cover'}
                                source = {selectedWorkerGlobal.image ? {
                                    uri: selectedWorkerGlobal.image.small
                                } : noAva}
                            /> 
                        </Neomorph>
                        <View style = {styles.userInfoRight}>
                            <View style = {styles.userInfo}>
                                <Text style = {styles.userInfoName}>{selectedWorkerGlobal.first_name} {selectedWorkerGlobal.last_name}</Text>
                                <Text style = {styles.userInfoPhone}>{selectedWorkerGlobal.age} {lang.workerTexts.age}</Text>
                            </View>
                            <View style = {styles.userInfoBottom}>
                                <Text style = {styles.userInfoPhone}>{selectedWorkerGlobal.phone}</Text>
                                {miniInfo && <Text style = {styles.userInfoPhone}>
                                    {!(selectedWorkerGlobal.specializations.length > 0) 
                                    ? lang.workerTabs.dailyWorker 
                                    : (lang.active === 'ru' 
                                    ? selectedWorkerGlobal.specializations[0].title 
                                    : selectedWorkerGlobal.specializations[0].slug)}
                                </Text>}
                            </View>
                        </View>
                    </View>
                </View>
                <View style = {styles.miniInfoBottom}>
                    <Ripple
                        rippleColor = '#4941a3'
                        onPress = {() => props.navigation.navigate('Blank')}
                    >
                        <ButtonCustom
                            miniInfo
                            title = {lang.buttonTitles.more}
                        />
                    </Ripple>
                    <Ripple
                        rippleColor = '#fff'
                        onPress = {() => dialCall(selectedWorkerGlobal.phone)}
                    >
                        <ButtonCustom
                            miniInfo
                            helperStyle = {styles.call}
                            call
                            title = {lang.buttonTitles.call}
                        />
                    </Ripple>
                </View>
            </View> 
            <ContentChanger
                contentChanger = {contentChanger}
                mapView = {mapView}
            />
        </View>
    </View>
)})



const WorkerList = React.memo(({workersList, selectSpec, selectedSpec, getSpecWorkers}) => {
    return (
        <View style = {workersList ? styles.workersListCont : { ...styles.workersListCont, ...styles.hide}}>
            <View style = {styles.workersList}>
                {specList.map((item, i) => (
                    <Text 
                        style = {(selectedSpec === item.slug) ? {...styles.workersListItem, ...styles.workersListItemSelected} : styles.workersListItem} 
                        key = {i}
                        onPress = {() => selectSpec(item.slug)}
                        >
                        { lang.active === 'ru' ? item.title : item.slug }
                    </Text>
                ))}
            </View>
            <View style = {styles.circleButtonCont}>
                <ButtonCustom
                    circle
                    title = {lang.buttonTitles.ok}
                    helperStyle = {styles.circleButton}
                    onPress = {getSpecWorkers}
                />
            </View>
        </View>  
    )
})


const ContentChanger = React.memo(({contentChanger, mapView}) => {
    return (
        <Text
            style = {styles.mapIconCont}
            onPress = {contentChanger}
        >
            <Neomorph
                lightShadowColor = "#FFF" // <- this// <- change zIndex of each shadow color
                darkShadowColor = "#000" // <- set this
                style = {styles.mapIconShadow}
            >
                <Image
                    style = {styles.mapIcon}
                    resizeMode = 'contain'
                    source = {mapView ? workersMap : earthMap}
                />
            </Neomorph>
        </Text>
    )
})

const styles = StyleSheet.create({
    mainCont: {
        position: 'relative',
        height: '100%',
        zIndex: 1
    },
    mapContainer: {
        // ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 0
      },
     
    container: {
        width: '100%',
        padding: 10,
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 6,
        flexDirection: 'column',
        backgroundColor: '#F0F2F6',
        shadowColor: "#fff",
        shadowOffset: {
            width: 2,
            height: -20,
        },
        shadowOpacity: 0.6,
        elevation: 5
    },
    containerForList: {
        position: 'relative'
    },
    hide: {
        display: 'none'
    },
    tabsCont: {
        width: '100%',
        marginTop: 13,
        marginBottom: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    workersListCont: {
        width: '100%',
    },
    workersList: {
        marginVertical: 20,
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    workersListItem: {
        paddingHorizontal: 2,
        paddingVertical: 3,
        borderStyle: 'dotted',
        borderBottomColor: '#545C77',
        borderBottomWidth: 1,
        borderRadius: 1,
        marginBottom: 5,
        marginRight: 8,
        color: '#545C77',
        lineHeight: 15
    },
    workersListItemSelected: {
        borderBottomColor: '#3391FF',
        color: '#3391FF',
    },
    circleButtonCont: {
        width: '100%',
        backgroundColor: '#ffffff00',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2222
    },
    miniInfo: {
        backgroundColor: '#F0F2F6',
        position: 'absolute',
        width: '92%',
        bottom: '20%',
        // padding: 20,
        alignSelf: 'center',
        borderColor: '#fff',
        borderRadius: 4,
        borderWidth: 1
    },
    miniInfoTop: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(33, 36, 61, 0.1)'
    },
    miniInfoBottom: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        
    },
    miniInfoTopLeft: {
        flexDirection: 'row',
        // marginRight: 20,
        
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
        marginRight: 20,
        
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
    userInfoRight: {
        width: '70%',
        justifyContent: 'space-around',
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userInfoBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userInfoName: {
        color: '#21243D',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontSize: 14,
    },
    userInfoPhone: {
        color: '#21243D',
        opacity: 0.5,
        fontSize: 13,
    },
    call: {
        color: '#fff'
    },
    mapIconCont: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    mapIconShadow: {
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
        marginBottom: 20,
        alignItems: 'center',
        borderRadius: 100,
        overflow: 'hidden'
    },
    mapIcon: {
        height: 20,
        width: 20,
    }
})