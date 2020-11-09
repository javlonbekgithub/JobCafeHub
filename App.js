import React, { useEffect } from 'react'
import { LogBox, Platform } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Home } from './src/components/home'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { ContentDrawer } from './src/components/drawer'
import { Auth } from './src/pages/auth'
import { Registration } from './src/pages/registration'
import { RegistrationNext } from './src/pages/registration-next'
import { Blank } from './src/pages/blank'
import { PointLocation } from './src/pages/point-location'
import { RegistrationJobGiver } from './src/pages/registration-job-giver/index'
import { Profile } from './src/pages/profile'
import { getMe, getSavedLang, navigationRef } from './src/helper-functions'
import { Information } from './src/pages/information'
import { Payment } from './src/pages/payment'

LogBox.ignoreAllLogs()

const Drawer = createDrawerNavigator()
export const App = () => {

  useEffect(() => {
    SplashScreen.hide()
    getSavedLang()  
    getMe()
  }, [])

  return (
    <NavigationContainer
      ref = {navigationRef}
    >
      <Drawer.Navigator
        drawerContent = {(props) => <ContentDrawer {...props}/>}
        initialRouteName = 'Home'
        drawerStyle = {{
          width: 300,
        }}
      >
        <Drawer.Screen 
          name="Home" 
          component = {Home}
        />
        <Drawer.Screen 
          name="Registration"
          component = {Registration}
        />
        <Drawer.Screen 
          name="RegistrationJobGiver"
          unmountOnBlur={true}
          options={{unmountOnBlur: true}} 
          component = {RegistrationJobGiver}
        />
        <Drawer.Screen 
          name="Auth" 
          unmountOnBlur={true}
          options={{unmountOnBlur: true}}
          component = {Auth}
          
        />
        <Drawer.Screen 
          name="RegistrationNext" 
          component = {RegistrationNext}
        />
        <Drawer.Screen 
          name="Blank"
          unmountOnBlur={true}
          options={{unmountOnBlur: true}} 
          component = {Blank}
        />
        <Drawer.Screen 
          name="PointLocation" 
          unmountOnBlur={true}
          options={{unmountOnBlur: true}} 
          component = {PointLocation}
        />
        <Drawer.Screen 
          name="Profile" 
          unmountOnBlur={true}
          options={{unmountOnBlur: true}}
          component = {Profile}
        />
        <Drawer.Screen 
          name="Information" 
          unmountOnBlur={true}
          options={{unmountOnBlur: true}}
          component = {Information}
        />
        <Drawer.Screen 
          name="Payment" 
          unmountOnBlur={true}
          options={{unmountOnBlur: true}}
          component = {Payment}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
