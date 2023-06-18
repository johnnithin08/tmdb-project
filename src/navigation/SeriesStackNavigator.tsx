import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Details, TvSeries } from '../pages'


const { Navigator, Screen } = createNativeStackNavigator<MoviesStackParamList>()


export const SeriesStackNavigator = () => {
  return (
    <Navigator initialRouteName='Dashboard' screenOptions={{ headerShown: false }}>
      <Screen name="Dashboard" component={TvSeries} />
      <Screen name="Details" component={Details} />
    </Navigator>
  )
}
