import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, Pressable, ScrollView, Text, View } from 'react-native'
import FastImage from "react-native-fast-image";
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { CustomSpacer, CustomTextInput, MovieCard, SafeAreaPage, SingleSelectPills } from '../../components'
import { autoWidth, centerHV, colorBlack, colorGray, flexChild, flexColCC, flexGrow, flexRow, flexWrap, px, sh10, sh20, sh200, sh24, sh32, sh4, sw100, sw16, sw24, sw32, sw36, sw54, sw600, sw8 } from '../../styles'
import { getMovieList, getTrendingTvSeries, getTvSeriesList, searchTvSeries } from '../../network-actions'
import { updateCurrentItem, updateSearchTvSeries, updateSeriesCategory, updateTvSeriesList, useAppDispatch, useAppSelector } from '../../store';
import { IMAGE_URL_CAROUSEL } from '../../constants';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH) * 0.8;

type ITvSeriesProps = TVScreenProps

export const TvSeries: FunctionComponent<ITvSeriesProps> = ({ navigation }: ITvSeriesProps) => {
  const [trending, setTrending] = useState<ITrending[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const scrollRef = useRef<ScrollView | undefined>()
  const carouselRef = useRef<Carousel | null>(null)
  const dispatch = useAppDispatch()
  const tvSeriesState = useAppSelector((state) => state.tvSeriesState)
  const { tvSeriesList, searchTerm: seriesName, seriesCategory: tvSeriesListCategory } = tvSeriesState

  const tvSeriesListCategoryArray: IPillsWithSubLabel[] = [{ label: "Airing Today" }, { label: "On the Air" }, { label: "Popular" }, { label: "Top Rated" }]


  const handletvSeriesListCategory = (value: TTvSeriesCategory) => {
    dispatch(updateSeriesCategory(value))
  }

  const handleFetchTvSeriesListCategory = async () => {
    setLoading(true)
    const tvSeriesListResponse = await getTvSeriesList(tvSeriesListCategory);
    setLoading(false)
    dispatch(updateTvSeriesList(tvSeriesListResponse))
  }

  const handleFetchTrending = async () => {
    setLoading(true)
    const trendingTvSeriesResponse: ITrending[] = await getTrendingTvSeries();
    setLoading(false)
    setTrending(trendingTvSeriesResponse.slice(0, 10))
  }

  const handleSearchSeries = async () => {
    setLoading(true)
    const moviesResponse = await searchTvSeries(seriesName);
    setLoading(false)
    dispatch(updateTvSeriesList(moviesResponse))
  }


  const handleSeriesName = (inputString: string) => {
    dispatch(updateSearchTvSeries(inputString))
  }

  useEffect(() => {
    if (seriesName === "") {
      handleFetchTvSeriesListCategory();
    }
    else {
      handleSearchSeries();
    }
  }, [seriesName])

  useEffect(() => {
    handleFetchTvSeriesListCategory();
    if (scrollRef !== null) {
      scrollRef.current?.scrollTo({ x: 0, y: 0 })
    }
  }, [tvSeriesListCategory])

  useEffect(() => {
    handleFetchTrending();
    handleFetchTvSeriesListCategory();
  }, [])

  // console.log('movie', loading)

  const renderCarouselItem = (item: any) => {
    const handlePress = () => {
      dispatch(updateCurrentItem({ category: "tv", data: item.item }))
      navigation.navigate("Details");
    }
    return (
      <Pressable onPress={handlePress}>
        <FastImage
          source={{ uri: `${IMAGE_URL_CAROUSEL}${item.item.poster_path}` }}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: sw32,
          }}
          resizeMode="stretch"
        />
      </Pressable>
    )
  }

  return (
    <SafeAreaPage>
      <View style={{ ...flexChild, backgroundColor: colorGray._5 }}>
        <CustomSpacer space={sh10} />
        <ScrollView >
          {trending.length === 0 ? (
            <ActivityIndicator size={'small'} />
          ) : (
            <View style={{ ...centerHV, height: sh200, marginBottom: sh10 }}>
              <Carousel
                autoplay={true}
                autoplayDelay={1000}
                ref={carouselRef}
                data={trending}
                loop
                renderItem={renderCarouselItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
              />
            </View>
          )}
          <View style={px(sw54)}>
            <CustomTextInput placeholder='Search' containerStyle={{ ...autoWidth }} onChangeText={handleSeriesName} style={{ ...autoWidth }} value={seriesName} viewStyle={{ ...autoWidth, borderRadius: 100 }} />
            <CustomSpacer space={sh10} />
            <ScrollView style={{ maxHeight: sh32 }} horizontal={true} showsHorizontalScrollIndicator={false}>
              <SingleSelectPills
                direction="row"
                labels={tvSeriesListCategoryArray}
                labelStyle={{ lineHeight: sh24 }}
                space={sw36}
                spaceToHeader={sh4}
                onSelect={handletvSeriesListCategory}
                value={tvSeriesListCategory}
              />
            </ScrollView>
          </View>
          <CustomSpacer space={sh10} />
          <ScrollView bounces={true} contentContainerStyle={flexGrow} ref={scrollRef} scrollEnabled={true} showsVerticalScrollIndicator={false} style={flexChild}>
            {loading === true ? (
              <View style={{ ...flexColCC, ...flexChild, height: Dimensions.get("screen").height * .4 }}>
                <ActivityIndicator size={"large"} />
              </View>
            ) : (
              <View style={{ ...flexChild, ...flexRow, ...flexWrap }}>
                {tvSeriesList.map((series: IMovie, index: number) => {

                  const handleSelectSeries = () => {
                    dispatch(updateCurrentItem({ category: "tv", data: series as IMovie }))
                    navigation.navigate("Details");
                  }
                  return (
                    <MovieCard key={index} handlePress={handleSelectSeries} posterPath={series.poster_path} />
                  )
                })}
              </View>
            )}
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaPage>
  )
}
