import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Actor, Details, Movies } from '../pages'


const { Navigator, Screen } = createNativeStackNavigator<MoviesStackParamList>()


export const MoviesStackNavigator = () => {
  return (
    <Navigator initialRouteName='Dashboard' screenOptions={{ headerShown: false }}>
      <Screen name="Dashboard" component={Movies} />
      <Screen name="Details" component={Details} />
      <Screen name="Actor" component={Actor} />
    </Navigator>
  )
}
