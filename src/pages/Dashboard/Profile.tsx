import React, { useEffect, useState } from 'react'
import { Image, Text, View, ViewStyle } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { CustomButton, RoundedButton, SafeAreaPage } from '../../components'
import { colorGray, colorGreen, colorTransparent, flexChild, px, sw24, sw56 } from '../../styles'
import { deleteSession, getAccountDetails } from '../../network-actions'
import { CommonActions } from '@react-navigation/native'
import { GRAVATAR_IMAGE_URL, ORIGINAL_IMAGE_URL } from '../../constants'

export const Profile = ({ navigation }) => {

  const [userData, setUserData] = useState<IUser>()

  const buttonStyle: ViewStyle = {
    backgroundColor: colorGreen._1,
    borderRadius: sw24,
    borderColor: colorTransparent
  }

  const handleLogout = async () => {
    await deleteSession();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      }),
    );
  }

  const fetchUserDetails = async () => {
    const currentSession: string = await AsyncStorage.getItem("currentSession") as unknown as string
    const userDataResponse: IUser | undefined = await getAccountDetails(currentSession)
    console.log("user", userDataResponse)
    if (userDataResponse !== undefined) {
      setUserData(userDataResponse)
    }

  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  return (
    <SafeAreaPage>
      <View style={{ ...flexChild, backgroundColor: colorGray._5 }}>
        <View style={px(sw56)}>
          <Image source={{ uri: `${GRAVATAR_IMAGE_URL}${userData?.avatar.gravatar.hash}` }} style={{ height: 200, width: 200 }} />
          <CustomButton buttonStyle={buttonStyle} onPress={handleLogout} text='Logout' />
        </View>
      </View>
    </SafeAreaPage>
  )
}
