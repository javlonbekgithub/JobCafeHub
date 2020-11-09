import { observer } from 'mobx-react'
import React from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { lang } from '../../store'
import { UserListSingle } from './../user-list-single/index'


const UserListIn = observer(({ handleScroll, userList, handleSelectWorker, mapView, enableScroll }) => (
    <View
        style = {!mapView ? styles.userList : styles.hide}
        >
        <ScrollView
            style = {styles.scrollCont}
            onScroll = {handleScroll}
            
        >
            {userList.length > 0 ? userList.map((item, i) => (
                <UserListSingle
                    datum = {item}
                    key = {i}
                    onPress = {() => handleSelectWorker(i)}
                />
            )) : 
                <Text style = {styles.searchResult}>{lang.workerTexts.searchResult}</Text>}
            {enableScroll && <Text style = {styles.loading}>{lang.loading}...</Text>}
        </ScrollView>
    </View>
))

export const UserList = React.memo(UserListIn)

const styles = StyleSheet.create({
    
    scrollCont: {
        height: '100%',
    },
    userList: {
        paddingHorizontal: 10,
    },
    searchResult: {
        alignItems: 'center',
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00000050'
    },
    loading: {
        height: 70,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    hide: {
        display: 'none'
    }
})