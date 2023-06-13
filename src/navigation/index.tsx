import React, { FunctionComponent, useEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Home, Login } from "../pages"
import { Private } from './Private'

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

export const RootNavigator: FunctionComponent = () => {

  let isLoggedIn: boolean | null = false
  const fetchLogin = async () => {

    isLoggedIn = await AsyncStorage.getItem("currentSession") as unknown as boolean | null
  }

  useEffect(() => {
    fetchLogin()
  }, [])
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn === false ? (
          <Screen name="Login" component={Login} />
        ) : null}
        <Screen name="Private" component={Private} />
      </Navigator>
    </NavigationContainer>
  )
}
