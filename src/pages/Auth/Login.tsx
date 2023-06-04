import React, { FunctionComponent, useState } from 'react'
import { Image, ImageStyle, SafeAreaView, Text, View, ViewStyle } from 'react-native'
import { CustomButton, CustomSpacer, CustomTextInput, SafeAreaPage } from '../../components'
import { colorGreen, colorTransparent, flexChild, flexColCC, px, sh100, sh200, sh24, sh300, sh32, sh48, sh56, sw100, sw12, sw16, sw200, sw24, sw248, sw400, sw500, sw56 } from '../../styles'
import { LocalAssets } from '../../assets/images/LocalAssets'
import { getSessionToken, login } from '../../network-actions'

declare interface ILoginProps {
  navigation: HomeScreenProps['navigation'];
  route: HomeScreenProps['route'];
}

export const Login: FunctionComponent<ILoginProps> = ({ navigation, route }: ILoginProps) => {
  const [userName, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const logoStyle: ImageStyle = {
    height: sh200,
    width: sw400,
    borderRadius: sw16
  }
  const buttonStyle: ViewStyle = {
    backgroundColor: colorGreen._1,
    borderRadius: sw24,
    borderColor: colorTransparent
  }

  const handleUserName = (value: string) => {
    setUserName(value)
  }

  const handlePassword = (value: string) => {
    setPassword(value)
  }
  const handleLogin = async () => {
    const sessionToken: string = await getSessionToken();
    const loginResponse = await login(userName, password, sessionToken)
    if (loginResponse === true) {
      navigation.navigate("Private")
    }
  }
  return (
    <SafeAreaPage>
      <View style={flexChild}>
        <CustomSpacer space={sh100} />
        <View style={flexColCC}>
          <Image style={logoStyle} source={LocalAssets.tmdbLogo} />
          <CustomSpacer space={sh48} />
        </View>
        <View style={{ ...px(sw248) }}>
          <CustomTextInput label='Username' onChangeText={handleUserName} value={userName} />
          <CustomSpacer space={sh24} />
          <CustomTextInput label='Password' onChangeText={handlePassword} value={password} secureTextEntry={true} />
          <CustomSpacer space={sh24} />
          <CustomButton buttonStyle={buttonStyle} onPress={handleLogin} text='Login' />
        </View>
      </View>
    </SafeAreaPage>
  )
}
