import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home } from '../pages'

const { Navigator, Screen } = createBottomTabNavigator<DashboardTabParamList>()

export const Private = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Dashboard" component={Home} />
    </Navigator>
  )
}
