import React, { useEffect, useState } from 'react'
import { Image, Text, View, ViewStyle } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native'

import { CustomButton, CustomSpacer, RoundedButton, SafeAreaPage } from '../../components'
import { centerHorizontal, centerVertical, colorGray, colorGreen, colorTransparent, colorWhite, flexChild, flexColCC, flexRow, flexRowCC, fs12RegWhite1, fs16RegWhite1, fs18BoldBlack2, fs24BoldWhite1, px, sh24, sh48, sw12, sw24, sw56 } from '../../styles'
import { deleteSession, getAccountDetails } from '../../network-actions'
import { GRAVATAR_IMAGE_URL } from '../../constants'

type IProfileProps = ProfileScreenProps

export const Profile = ({ navigation }: IProfileProps) => {

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
        <View style={{ ...px(sw56), ...flexChild }}>
          <CustomSpacer space={sh24} />
          <View style={{ ...flexChild, ...flexColCC }}>
            <View style={{ ...flexRow, ...centerVertical }}>
              <Text style={{ ...fs18BoldBlack2, color: colorWhite._1 }}>Name:</Text>
              <CustomSpacer isHorizontal={true} space={sw24} />
              <Text style={{ ...fs18BoldBlack2, color: colorWhite._1 }}>{userData?.name}</Text>
            </View>
            <CustomSpacer space={sh24} />
            <View style={{ ...flexRow, ...centerVertical }}>
              <Text style={{ ...fs18BoldBlack2, color: colorWhite._1 }}>Username:</Text>
              <CustomSpacer isHorizontal={true} space={sw24} />
              <Text style={{ ...fs18BoldBlack2, color: colorWhite._1 }}>{userData?.username}</Text>
            </View>
            <CustomSpacer space={sh48} />
            <View style={{ ...flexRow, ...centerHorizontal }}>
              <CustomButton buttonStyle={buttonStyle} onPress={handleLogout} text='Logout' />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaPage>
  )
}
