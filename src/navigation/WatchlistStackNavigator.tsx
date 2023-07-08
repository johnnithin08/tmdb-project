import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Actor, Details, Watchlist } from '../pages'


const { Navigator, Screen } = createNativeStackNavigator<MoviesStackParamList>()


export const WatchlistStackNavigator = () => {
  return (
    <Navigator initialRouteName='Dashboard' screenOptions={{ headerShown: false }}>
      <Screen name="Dashboard" component={Watchlist} />
      <Screen name="Details" component={Details} />
      <Screen name="Actor" component={Actor} />
    </Navigator>
  )
}
