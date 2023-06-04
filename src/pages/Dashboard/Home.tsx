import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, ScrollView, Text, View } from 'react-native'
import FastImage from "react-native-fast-image";
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { CustomSpacer, CustomTextInput, MovieCard, SafeAreaPage, SingleSelectPills } from '../../components'
import { autoWidth, centerHV, colorBlack, colorGray, flexChild, flexColCC, flexGrow, flexRow, flexWrap, px, sh10, sh20, sh200, sh24, sh32, sh4, sw100, sw16, sw24, sw32, sw36, sw54, sw600, sw8 } from '../../styles'
import { getMovieList, getTrending } from '../../network-actions'

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH) * 0.8;

export const Home: FunctionComponent = () => {
  const [movieListCategory, setMovieListCategory] = useState<string>("Now Playing");
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<ITrending[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const scrollRef = useRef<ScrollView | undefined>()
  const carouselRef = useRef<Carousel | null>(null)

  const movieListCategoryArray: IPillsWithSubLabel[] = [{ label: "Now Playing" }, { label: "Popular" }, { label: "Top Rating" }, { label: "Upcoming" }]


  const handleMovieListCategory = (value: string) => {
    setMovieListCategory(value)
  }

  const handleFetchMovieListCategory = async () => {
    setLoading(true)
    const movieListResponse = await getMovieList(movieListCategory);
    setLoading(false)
    setMovieList(movieListResponse)
  }

  const handleFetchTrending = async () => {
    setLoading(true)
    const trendingResponse: ITrending[] = await getTrending();
    setLoading(false)
    setTrending(trendingResponse.slice(0, 10))
  }

  useEffect(() => {
    handleFetchMovieListCategory();
    handleFetchTrending()
    if (scrollRef !== null) {
      scrollRef.current?.scrollTo({ x: 0, y: 0 })
    }
  }, [movieListCategory])

  console.log('movie', trending)

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
            <CustomTextInput placeholder='Search' containerStyle={{ ...autoWidth }} style={{ ...autoWidth }} viewStyle={{ ...autoWidth, borderRadius: 100 }} />
            <CustomSpacer space={sh10} />
            <ScrollView style={{ maxHeight: sh32 }} horizontal={true} showsHorizontalScrollIndicator={false}>
              <SingleSelectPills
                direction="row"
                labels={movieListCategoryArray}
                labelStyle={{ lineHeight: sh24 }}
                space={sw36}
                spaceToHeader={sh4}
                onSelect={handleMovieListCategory}
                value={movieListCategory}
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
                {movieList.map((movie: Movie, index: number) => {
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
