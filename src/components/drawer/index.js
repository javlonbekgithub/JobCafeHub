import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { defaultUser, setError, setRegistration, setUser, user} from './../../store/index'
import { saveToken } from '../../helper-functions'
import { TopDrawer } from './top'


const DrawerIn = ({navigation}) => {
    const signInAsWorker = useCallback(() => {
        navigation.navigate('Auth')
        setError('')
        setRegistration('Registration')
    }, [])

    const signInAsJobGiver = useCallback(() => {
        navigation.navigate('Auth')
        setError('')
        setRegistration('RegistrationJobGiver')
    },[])

    const exitProfile = useCallback(() => {
        if (navigation.dangerouslyGetState().index === 7) {
            navigation.navigate('Home')
        }
        setUser(defaultUser)
        saveToken('')
        setError('')
        navigation.closeDrawer()
    },[user])

    const closeDrawer = useCallback(() => {
        navigation.closeDrawer()
    },[user])

    return(
        <View style = { styles.drawerCont }>
            <TopDrawer
                user = {user}
                closeDrawer = {closeDrawer}
                exitProfile = {exitProfile}
                signInAsJobGiver = {signInAsJobGiver}
                signInAsWorker = {signInAsWorker}
            />
        </View>
    )
}

export const ContentDrawer = React.memo(DrawerIn)

const styles = StyleSheet.create({
    drawerCont: {
        flexDirection: 'column',
        // padding: 20,
        paddingVertical: 20,
        width: '100%',
        height: '100%',
        backgroundColor: '#F0F2F6',
        justifyContent: 'space-between',
    },
    })

