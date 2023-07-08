import React, { FunctionComponent, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, Pressable, ScrollView, Text, View, ViewStyle } from 'react-native'
import { useIsFocused } from '@react-navigation/native';


import { CustomSpacer, MovieCard, SafeAreaPage } from "../../components"
import { colorBlack, colorGray, colorGreen, colorWhite, flexChild, flexColCC, flexGrow, flexRow, flexRowCC, flexWrap, fs12BoldBlack2, fs16BoldBlack2, px, py, sh16, sh24, sh32, sh4, sh48, sw16, sw32, sw4, sw54 } from "../../styles"
import { getWatchlistMovies, getWatchlistTvSeries } from "../../network-actions";
import { updateCurrentItem, useAppDispatch } from '../../store';

declare type TCategory = "Movies" | "TV Series";
type IWatchlistProps = WatchlistScreenProps;

export const Watchlist: FunctionComponent<IWatchlistProps> = ({ navigation }: IWatchlistProps) => {
  const isFocused = useIsFocused()
  const [category, setCategory] = useState<TCategory>("Movies")
  const [watchlist, setWatchlist] = useState<IWatchlist[]>([])
  const [loading, setLoading] = useState<boolean>(true)


  const dispatch = useAppDispatch();



  const tabsArray: TCategory[] = ["Movies", "TV Series"]

  const tabsContainer: ViewStyle = {
    ...flexRow,
    height: sh48,
    borderRadius: sw16,
  }

  const fetchWatchlist = async () => {
    setLoading(true)
    try {
      const watchlistResponse = category === "Movies" ? await getWatchlistMovies() : await getWatchlistTvSeries();
      setWatchlist(watchlistResponse)
      setLoading(false)
    }
    catch (err) {
      Alert.alert("Something went wrong")
    }
  }

  useEffect(() => {
    fetchWatchlist()
  }, [category])

  useEffect(() => {
    if (isFocused === true) {
      fetchWatchlist()
    }
  }, [isFocused])


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
          <CustomSpacer space={sh16} />
        </View>
        <ScrollView bounces={true} scrollEnabled={true} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
          {loading === true ? (
            <View style={{ ...flexColCC, ...flexChild, height: Dimensions.get("screen").height * .4 }}>
              <ActivityIndicator size={"large"} />
            </View>
          ) : (
            <View style={{ ...flexChild, ...flexRow, ...flexWrap }}>
              {watchlist.map((watchItem: IWatchlist, index: number) => {
                const handleSelectMovie = () => {
                  const checkCategory = category === "Movies" ? "movies" : "tv";
                  dispatch(updateCurrentItem({ category: checkCategory, data: watchItem as IMovie }))
                  navigation.navigate("Details");
                }
                return (
                  <MovieCard key={index} handlePress={handleSelectMovie} posterPath={watchItem.poster_path} />
                )
              })}
            </View>
          )}
          <CustomSpacer space={100} />
        </ScrollView>
      </View>
    </SafeAreaPage>
  )
}
