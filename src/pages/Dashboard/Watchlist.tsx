import React, { useEffect, useState } from 'react'
import { Alert, Pressable, Text, View, ViewStyle } from 'react-native'
import { useIsFocused } from '@react-navigation/native';


import { CustomSpacer, SafeAreaPage } from "../../components"
import { colorBlack, colorGray, colorGreen, colorWhite, flexChild, flexRow, flexRowCC, fs12BoldBlack2, fs16BoldBlack2, px, py, sh24, sh32, sh4, sh48, sw16, sw32, sw4, sw54 } from "../../styles"
import { getWatchlistMovies, getWatchlistTvSeries } from "../../network-actions";

declare type TCategory = "Movies" | "TV Series"

export const Watchlist = () => {
  const isFocused = useIsFocused()
  const [category, setCategory] = useState<TCategory>("Movies")
  const [watchlist, setWatchlist] = useState<IWatchlist[]>([])



  const tabsArray: TCategory[] = ["Movies", "TV Series"]

  const tabsContainer: ViewStyle = {
    ...flexRow,
    height: sh48,
    borderRadius: sw16,
  }

  const fetchWatchlist = async () => {
    try {
      const watchlistResponse = category === "Movies" ? await getWatchlistMovies() : await getWatchlistTvSeries();
      setWatchlist(watchlistResponse)
    }
    catch (err) {
      Alert.alert("Something went wrong")
    }
  }
  console.log("watch", watchlist)

  useEffect(() => {
    fetchWatchlist()
  }, [category])


  return (
    <SafeAreaPage>
      <View style={{ ...flexChild, backgroundColor: colorGray._5 }}>
        <CustomSpacer space={sh24} />
        <View style={px(sw54)}>
          <View style={tabsContainer}>
            {tabsArray.map((eachTab: string, tabIndex: number) => {

              const handleCategory = () => {
                setCategory(tabsArray[tabIndex])
              }

              const backgroundColor: ViewStyle = category === eachTab ? { backgroundColor: colorGreen._1 } : { backgroundColor: colorWhite._1 }
              const textColor = category === eachTab ? colorWhite._1 : colorBlack._1
              const checkBorderStyle: ViewStyle = tabIndex === 0 ? { borderTopLeftRadius: sw32, borderBottomLeftRadius: sw32 } : { borderTopRightRadius: sw32, borderBottomRightRadius: sw32 }

              return (
                <Pressable key={tabIndex} onPress={handleCategory} style={{ ...flexChild, ...flexRowCC, ...backgroundColor, ...checkBorderStyle }}>
                  <Text style={{ ...fs16BoldBlack2, color: textColor }}>{eachTab}</Text>
                </Pressable>
              )
            })}
          </View>

        </View>

      </View>
    </SafeAreaPage>
  )
}
