import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, ScrollView, Text, View } from 'react-native'
import FastImage from "react-native-fast-image";
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { CustomSpacer, CustomTextInput, MovieCard, SafeAreaPage, SingleSelectPills } from '../../components'
import { autoWidth, centerHV, colorBlack, colorGray, flexChild, flexColCC, flexGrow, flexRow, flexWrap, px, sh10, sh20, sh200, sh24, sh32, sh4, sw100, sw16, sw24, sw32, sw36, sw54, sw600, sw8 } from '../../styles'
import { getMovieList, getTrendingTvSeries, getTvSeriesList, searchTvSeries } from '../../network-actions'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH) * 0.8;

export const TvSeries: FunctionComponent = () => {
  const [tvSeriesListCategory, settvSeriesListCategory] = useState<string>("Airing Today");
  const [seriesName, setSeriesName] = useState<string>("");
  const [tvSeriesList, setTvSeriesList] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<ITrending[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  // const loading = useRef<boolean>(true)
  const scrollRef = useRef<ScrollView | undefined>()
  const carouselRef = useRef<Carousel | null>(null)

  const tvSeriesListCategoryArray: IPillsWithSubLabel[] = [{ label: "Airing Today" }, { label: "On the Air" }, { label: "Popular" }, { label: "Top Rated" }]


  const handletvSeriesListCategory = (value: string) => {
    settvSeriesListCategory(value)
  }

  const handleFetchTvSeriesListCategory = async () => {
    setLoading(true)
    // loading.current = true
    const tvSeriesListResponse = await getTvSeriesList(tvSeriesListCategory);
    setLoading(false)
    // loading.current = false
    setTvSeriesList(tvSeriesListResponse)
  }

  const handleFetchTrending = async () => {
    setLoading(true)
    // loading.current = true
    const trendingTvSeriesResponse: ITrending[] = await getTrendingTvSeries();
    setLoading(false)
    // loading.current = false
    setTrending(trendingTvSeriesResponse.slice(0, 10))
  }

  const handleSearchSeries = async () => {
    setLoading(true)
    const moviesResponse = await searchTvSeries(seriesName);
    setLoading(false)
    setTvSeriesList(moviesResponse)
  }


  const handleSeriesName = (inputString: string) => {
    setSeriesName(inputString)
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
    console.log("enter in all")
    handleFetchTrending();
    handleFetchTvSeriesListCategory();
  }, [])

  // console.log('movie', loading)

  const renderCarouselItem = (item: ITrending) => {
    return (
      <FastImage
        source={{ uri: `https://image.tmdb.org/t/p/original${item.item.poster_path}` }}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: sw32,
        }}
        resizeMode="stretch"
      />
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
              <View style={{ ...flexColCC, ...flexChild }}>
                <ActivityIndicator size={"large"} />
              </View>
            ) : (
              <View style={{ ...flexChild, ...flexRow, ...flexWrap }}>
                {tvSeriesList.map((movie: Movie, index: number) => {
                  return (
                    <MovieCard key={index} posterPath={movie.poster_path} />
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
