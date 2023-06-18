import React, { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { Alert, Image, ImageStyle, ScrollView, Text, View, ViewStyle } from 'react-native'
import TouchID from 'react-native-touch-id'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Keychain from 'react-native-keychain'


import { CustomButton, CustomSpacer, CustomTextInput, SafeAreaPage } from '../../components'
import { centerHorizontal, colorBlack, colorGreen, colorTransparent, colorWhite, flexChild, flexColCC, flexRowCC, fs12BoldBlack2, px, sh100, sh200, sh24, sh300, sh32, sh48, sh56, sw05, sw1, sw100, sw12, sw16, sw200, sw24, sw248, sw400, sw500, sw56, sw8 } from '../../styles'
import { LocalAssets } from '../../assets/images/LocalAssets'
import { login } from '../../network-actions'

declare type ILoginProps = LoginScreenProps

interface ICredentials {
  username: string;
  password: string;
}

export const Login: FunctionComponent<ILoginProps> = ({ navigation }: ILoginProps) => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [biometrics, setBiometrics] = useState<ICredentials | null>(null)

  const logoStyle: ImageStyle = {
    height: sh200,
    width: sw400,
    borderRadius: sw16
  }
  const loginButtonStyle: ViewStyle = {
    backgroundColor: colorGreen._1,
    borderRadius: sw24,
    borderColor: colorTransparent,
  }
  const biometricsButtonStyle: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
    borderColor: colorTransparent,
  }

  const handleUsername = (value: string) => {
    setUsername(value)
  }

  const handlePassword = (value: string) => {
    setPassword(value)
  }
  const handleLogin = async (credentials?: ICredentials) => {
    const usernameRequest = credentials !== undefined ? credentials.username : username
    const passwordRequest = credentials !== undefined ? credentials.password : password
    const loginResponse: boolean = await login(usernameRequest, passwordRequest);
    if (loginResponse === true) {
      if (credentials === undefined) {
        await Keychain.setGenericPassword(username, password);
      }
      navigation.navigate("Private")
    }
  }

  const handleNavigation = async () => {

    if (biometrics) {
      handleLogin(biometrics);
    } else {
      console.log('No credentials stored');
    }
  }

  const handleAuthentication = async () => {
    // const currentSession = await AsyncStorage.getItem("currentSession")
    // if (currentSession !== null) {
    TouchID.isSupported()
      .then(biometryType => {
        console.log("type", biometryType)
        TouchID.authenticate()
          .then(success => {
            handleNavigation()
          })
          .catch(error => {
            console.log(error)
            Alert.alert(error.message);
          });
      })
      .catch(err => {
        console.log("err", err)
      })
    // }
  }

  const handleCheckBiometrics = async () => {
    const credentials = await Keychain.getGenericPassword();
    setBiometrics(credentials as ICredentials | null)
  }

  useEffect(() => {
    handleCheckBiometrics()
  }, [])

  return (
    <SafeAreaPage>
      <ScrollView>
        <View style={flexChild}>
          <CustomSpacer space={sh100} />
          <View style={flexColCC}>
            <Image style={logoStyle} source={LocalAssets.tmdbLogo} />
            <CustomSpacer space={sh48} />
          </View>
          <View style={{ ...px(sw248), ...flexColCC }}>
            <View style={centerHorizontal}>
              <CustomTextInput label='Username' onChangeText={handleUsername} value={username} />
              <CustomSpacer space={sh24} />
              <CustomTextInput label='Password' onChangeText={handlePassword} value={password} secureTextEntry={true} />
              <CustomSpacer space={sh24} />
              <CustomButton buttonStyle={loginButtonStyle} onPress={handleLogin} text='Login' />
              <CustomSpacer space={sh24} />
              {biometrics !== null ? (
                <Fragment>
                  <View style={{ ...flexRowCC }}>
                    <View style={{ ...flexChild, borderWidth: 0.5, borderBottomColor: colorBlack._1 }} />
                    <CustomSpacer isHorizontal={true} space={sw8} />
                    <Text style={fs12BoldBlack2}>Or</Text>
                    <CustomSpacer isHorizontal={true} space={sw8} />
                    <View style={{ ...flexChild, borderWidth: 0.5, borderBottomColor: colorBlack._1 }} />
                  </View>
                  <CustomSpacer space={sh24} />
                  <CustomButton buttonStyle={biometricsButtonStyle} onPress={handleAuthentication} text='Use Biometrics' textStyle={{ color: colorBlack._1 }} />
                </Fragment>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaPage>
  )
}
