import React, { FunctionComponent, useEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Login } from "../pages"
import { Private } from './Private'
import { updateIsLoggedIn, useAppDispatch, useAppSelector } from '../store';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

export const RootNavigator: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const globalState = useAppSelector((state) => state.globalState)
  const { isLoggedIn } = globalState


  const fetchLogin = async () => {
    const isLoggedIn = await AsyncStorage.getItem("currentSession") as unknown as string | null
    if (isLoggedIn !== null) {
      dispatch(updateIsLoggedIn(true))
    }
  }


  useEffect(() => {
    fetchLogin();
  }, [])
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn === false ? (
          <Screen name="Login" component={Login} />
        ) : (
          <Screen name="Private" component={Private} />
        )}
      </Navigator>
    </NavigationContainer>
  )
}
