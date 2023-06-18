import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, Pressable, ScrollView, Text, View } from 'react-native'
import FastImage from "react-native-fast-image";
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { CustomSpacer, CustomTextInput, MovieCard, SafeAreaPage, SingleSelectPills } from '../../components'
import { autoWidth, centerHV, colorBlack, colorGray, flexChild, flexColCC, flexGrow, flexRow, flexWrap, px, sh10, sh20, sh200, sh24, sh32, sh4, sw100, sw16, sw24, sw32, sw36, sw54, sw600, sw8 } from '../../styles'
import { getMovieList, getTrendingMovies, searchMovies } from '../../network-actions'
import { updateCurrentItem, updateMovieCategory, updateMoviesList, updateSearchMovie, updateSeriesCategory, updateTrendingMovies, useAppDispatch, useAppSelector } from "../../store"
import { IMAGE_URL_CAROUSEL } from '../../constants';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH) * 0.8;

type IMoviesProps = MoviesScreenProps;


export const Movies: FunctionComponent<IMoviesProps> = ({ navigation }: IMoviesProps) => {
  // const [trending, setTrending] = useState<ITrending[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const scrollRef = useRef<ScrollView | undefined>()
  const carouselRef = useRef<Carousel | null>(null)
  const dispatch = useAppDispatch();
  const moviesState = useAppSelector((state) => state.moviesState)
  const { movieList, searchTerm: movieName, movieCategory: movieListCategory, trending } = moviesState

  const movieListCategoryArray: IPillsWithSubLabel[] = [{ label: "Now Playing" }, { label: "Popular" }, { label: "Top Rating" }, { label: "Upcoming" }]


  const handleMovieListCategory = (value: TMovieCategory) => {
    dispatch(updateMovieCategory(value))
  }

  const handleFetchMovieListCategory = async () => {
    setLoading(true)
    const movieListResponse = await getMovieList(movieListCategory);
    setLoading(false)
    dispatch(updateMoviesList(movieListResponse))
  }

  const handleFetchTrending = async () => {
    setLoading(true)
    const trendingResponse: ITrending[] = await getTrendingMovies();
    setLoading(false)
    dispatch(updateTrendingMovies(trendingResponse.slice(0, 10)))
  }

  const handleSearchMovies = async () => {
    setLoading(true)
    const moviesResponse = await searchMovies(movieName);
    setLoading(false)
    dispatch(updateMoviesList(moviesResponse))
  }

  const handleMovieName = (inputString: string) => {
    dispatch(updateSearchMovie(inputString))
  }

  useEffect(() => {
    if (movieName === "") {
      handleFetchMovieListCategory();
    }
    else {
      handleSearchMovies();
    }
  }, [movieName])

  useEffect(() => {
    handleFetchMovieListCategory();
    if (scrollRef !== null) {
      scrollRef.current?.scrollTo({ x: 0, y: 0 })
    }
  }, [movieListCategory])

  useEffect(() => {
    console.log('enter')
    handleFetchMovieListCategory();
    handleFetchTrending()
  }, [])

  const renderCarouselItem = (item: any) => {
    const handlePress = () => {
      dispatch(updateCurrentItem({ category: "movies", data: item.item }))
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
        <ScrollView keyboardShouldPersistTaps={true}>
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
            <CustomTextInput placeholder='Search' containerStyle={{ ...autoWidth }} onChangeText={handleMovieName} style={{ ...autoWidth }} viewStyle={{ ...autoWidth, borderRadius: 100 }} value={movieName} />
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
          <ScrollView bounces={true} contentContainerStyle={flexGrow} ref={scrollRef} scrollEnabled={true} showsVerticalScrollIndicator={false} style={flexChild} keyboardShouldPersistTaps={true}>
            {loading === true ? (
              <View style={{ ...flexColCC, ...flexChild, height: Dimensions.get("screen").height * .4 }}>
                <ActivityIndicator size={"large"} />
              </View>
            ) : (
              <View style={{ ...flexChild, ...flexRow, ...flexWrap }}>
                {movieList.map((movie: IMovie, index: number) => {

                  const handleSelectMovie = () => {
                    dispatch(updateCurrentItem({ category: "movies", data: movie }))
                    navigation.navigate("Details");
                  }
                  return (
                    <MovieCard key={index} handlePress={handleSelectMovie} posterPath={movie.poster_path} />
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
