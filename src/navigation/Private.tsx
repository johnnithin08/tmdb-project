import React, { Fragment, useEffect, useRef } from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Movies, Profile, TvSeries, Watchlist } from '../pages'
import { Icon, Icons } from '../components'
import { absolutePosition, colorBlack, colorGreen, colorWhite, flexChild, flexColCC } from '../styles'
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { WatchlistStackNavigator } from './WatchlistStackNavigator'
import { SeriesStackNavigator } from './SeriesStackNavigator'
import { MoviesStackNavigator } from './MoviesStackNavigator'

const { Navigator, Screen } = createBottomTabNavigator<DashboardTabParamList>()


export const Private = () => {

  const tabsArray = [
    {
      name: "Movies",
      component: MoviesStackNavigator,
      type: Icons.Fontisto,
      iconName: "film",
    },
    {
      name: "TV",
      component: SeriesStackNavigator,
      type: Icons.Feather,
      iconName: "tv",
    },
    {
      name: "Watchlist",
      component: WatchlistStackNavigator,
      type: Icons.MaterialCommunityIcons,
      iconName: "heart-plus",
    },
    {
      name: "Profile",
      component: Profile,
      type: Icons.MaterialIcons,
      iconName: "account-circle",
    },
  ]

  const TabBarButton = (props: BottomTabBarButtonProps) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null)
    const scale = useSharedValue(1)

    useEffect(() => {
      if (focused === true) {

        scale.value = 1.5
      }
      else {
        scale.value = 1
      }
    }, [focused])

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: withTiming(scale.value, { duration: 500 }) }]
      };
    }, [focused]);

    return (
      <TouchableOpacity onPress={onPress} style={{ ...flexChild, ...flexColCC }}>
        <Animated.View style={animatedStyle}>

          <Icon type={item.type} name={item.iconName} color={focused ? colorGreen._1 : colorBlack._1} />
        </Animated.View>
      </TouchableOpacity>
    )

  }

  const barStyle: ViewStyle = {
    ...absolutePosition,
    backgroundColor: colorWhite._1,
    bottom: 15,
    left: 15,
    right: 15,
    borderRadius: 16,
  }
  return (
    <Navigator screenOptions={{ headerShown: false, tabBarStyle: barStyle }}>
      {tabsArray.map((eachScreen, index) => {
        const { name, component, type, iconName } = eachScreen;

        return (
          <Screen key={index} name={name} component={component} options={{ tabBarShowLabel: true, tabBarButton: (props) => <TabBarButton {...props} item={eachScreen} /> }} />
        )
      })}
    </Navigator>
  )
}
