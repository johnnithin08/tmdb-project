/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"

import { flexChild } from "./src/styles";
import { RootNavigator } from "./src/navigation";

export const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      {Platform.select({
        android: (
          <KeyboardAvoidingView behavior="height" style={flexChild}>
            <RootNavigator />
          </KeyboardAvoidingView>
        ),
        ios: (
          <KeyboardAvoidingView behavior="padding" style={flexChild}>
            <RootNavigator />
          </KeyboardAvoidingView>
        ),
      })}
    </SafeAreaProvider>
  );
}
