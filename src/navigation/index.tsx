import React, { FunctionComponent } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { Home, Login } from "../pages"
import { Private } from './Private'

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

export const RootNavigator: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Login" component={Login} />
        <Screen name="Private" component={Private} />
      </Navigator>
    </NavigationContainer>
  )
}
