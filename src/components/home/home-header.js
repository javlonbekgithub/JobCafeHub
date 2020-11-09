import React from 'react'
import { View, Image, TextInput, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Neomorph } from 'react-native-neomorph-shadows'
import logo from '../../assets/logo/logo3.png'
import manNotSelected from '../../assets/icons/man3.png'
import manSelected from '../../assets/icons/manSelected.png'
import womanSelected from '../../assets/icons/woman3.png'
import womanNotSelected from '../../assets/icons/womanNotSelected.png'
import searchIcon from '../../assets/icons/search3.png'
import menu from '../../assets/icons/menu3.png'
import { genderFilter, lang } from './../../store/index'
import { observer } from 'mobx-react'



const HomeHeaderIn = observer(({ search,  searchValue, openDrawer, openSearch, handleGenderFilter, handleSetSearchValue}) => {
    console.log('header')
    return (
        <Neomorph
            darkShadowColor = "#000" // <- set this
            lightShadowColor = "#fff" // <- this// <- change zIndex of each shadow color
            style = {styles.headerCont}
        >
            <View style = { !search ? styles.items : styles.hide }>
                <TouchableOpacity 
                    activeOpacity={0.1}
                    style = { styles.menu }
                    onPress = {openDrawer}
                    underlayColor="#DDDDDD"
                >
                    <Image 
                        style = {styles.menuIcon}
                        resizeMode = 'contain'
                        source = { menu }
                    />
                </TouchableOpacity>
                <View style = {styles.logoCont}>
                    <Image
                        resizeMode = 'contain'
                        style = {styles.logo}
                        source = { logo }
                    />
                </View>
                <View style = { styles.gender }>
                    <TouchableWithoutFeedback
                        onPress = {() => handleGenderFilter(1)}
                    >
                        <Image
                            style = { styles.iconGender}
                            source = { (genderFilter.value === 1) ? manSelected : manNotSelected}
                        />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress = {() => handleGenderFilter(2)}
                    >
                        <Image
                            style = { styles.iconGender}
                            source = { (genderFilter.value === 2) ? womanSelected : womanNotSelected }
                        />
                    </TouchableWithoutFeedback>
                </View>  
            </View>
            <TextInput 
                placeholder = {lang.inputPlaceHolder.search}
                onChange = {(e) => handleSetSearchValue(e.nativeEvent.text)}
                value = {searchValue}
                style = { search ? styles.searchInput : styles.hide }
            /> 
            <TouchableOpacity
                activeOpacity={0.1}
                style = { styles.searchCont }
                onPress = {openSearch}
            >
                <Image
                    style = { styles.search }
                    resizeMode = 'contain'
                    source = { searchIcon }
                />
            </TouchableOpacity>
        </Neomorph>
        
    )
})

export const HomeHeader = React.memo(HomeHeaderIn)

const styles = StyleSheet.create({
    headerCont: {
        shadowOffset: {
            width: 1.2, 
            height: 1.5
        },
        shadowOpacity: 0.1, // <- and this or yours opacity
        shadowRadius: 2,
        borderRadius: 4,
        backgroundColor: '#F0F2F6',
        // backgroundColor: 'red',
        width: Dimensions.get('screen').width - 20,
        height: 60,
        marginBottom: 5,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 4,
    },
    items: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menu: {
        padding: 22,
    },
    menuIcon: {
        width: 20, 
        height: 20
    },
    logoCont: {
        flex: 1,
        paddingLeft: 20,
        
    },
    logo: {
        // marginLeft: -30,
        // left: -10,
        width: 110,
        height: 20,
    },
    gender: {
        flexDirection: 'row',
    },
    iconGender: {
        height: 20,
        width: 20, 
        padding: 10,
        margin: 7
    },
    searchInput: {
        flex: 1,
        padding: 5.5,
        fontSize: 16,
        marginLeft: 10,
        
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    searchCont: {
        // backgroundColor: 'red',
        padding: 22,
        marginLeft: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    search: {
        width: 20,
        height: 20
    },
    hide: {
        display: 'none'
    },
})