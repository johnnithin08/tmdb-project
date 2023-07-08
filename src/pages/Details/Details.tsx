import React, { Fragment, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, ImageStyle, Pressable, ScrollView, Text, View, ViewStyle } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";
import Feather from 'react-native-vector-icons/Feather';
import { Rating } from 'react-native-ratings';


import { updateCurrentActor, useAppDispatch, useAppSelector } from '../../store';
import { CustomButton, CustomFlexSpacer, CustomSpacer, Icon, IconButton, MovieCard, RoundedButton, SafeAreaPage } from '../../components';
import { border, centerHorizontal, centerVertical, colorGray, colorGreen, colorTransparent, colorWhite, flexChild, flexColCC, flexGrow, flexRow, flexRowCC, flexWrap, fs10BoldWhite1, fs12BoldWhite1, fs16BoldWhite1, fs18BoldBlack2, fs24BoldWhite1, fs32BoldWhite1, fullWidth, px, py, sh100, sh16, sh24, sh4, sh8, sw1, sw100, sw12, sw16, sw20, sw24, sw32, sw4, sw48, sw56, sw8, sw80 } from '../../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LocalAssets } from '../../assets/images/LocalAssets';
import { IMAGE_URL_CARD, IMAGE_URL_CAROUSEL, IMAGE_URL_CAST } from '../../constants';
import { addRatingMovie, addRatingSeries, getMovieAccountState, getMovieCredits, getMovieDetails, getMovieVideos, getSeriesAccountState, getSeriesCredits, getSeriesDetails, getSeriesVideos, getSimilarMovies, getSimilarSeries, updateWatchlist } from '../../network-actions';
import { TrailersMore } from './TrailersMore';
import { MoreLikeThis } from './MoreLikeThis';
import { Episodes } from './Episodes';

type IDetailsProps = DetailsScreenProps
type TTabs = "Seasons" | "More Like This" | "Trailers & More"

export const Details = ({ navigation }: IDetailsProps) => {
  const [details, setDetails] = useState<IMovieDetails | undefined>(undefined)
  const [videoDetails, setVideoDetails] = useState<IMovieVideos | undefined>(undefined)
  const [accountStates, setAccountStates] = useState<IAccountStates | undefined>(undefined)
  const [rating, setRating] = useState<number>(0);
  const [credits, setCredits] = useState<ICredits>({ id: undefined, cast: [] })
  const [recommendations, setReccomendations] = useState<IMovie[]>([])
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [tabLoading, setTabLoading] = useState<boolean>(true)
  const [hasSeasons, setHasSeasons] = useState<boolean>(false)
  const [contentLoading, setContentLoading] = useState<boolean>(true)
  const [tab, setTab] = useState<TTabs>("More Like This")
  const scrollRef = useRef<ScrollView>(null)
  const dispatch = useAppDispatch();
  const detailsState: IItem = useAppSelector((state) => state.globalState.currentItem) as IItem
  const { category, data } = detailsState

  const tabsArray: TTabs[] = ["Trailers & More", "More Like This"]

  const handleBack = () => {
    navigation.goBack();
  }

  const handleError = () => {
    console.log("error")
    // setError(true)
  }

  // const handleBuffer = (data: OnBufferData) => {
  //   setBuffering(true)
  // }

  const fetchDetails = async () => {
    setContentLoading(true)
    const detailsResponse = category === "movies" ? await getMovieDetails(data.id) : await getSeriesDetails(data.id);
    setDetails(detailsResponse)
    if (category === "tv") {
      setHasSeasons(true)
      setTab("Seasons")
    }
    setContentLoading(false)
  }

  const fetchVideos = async () => {
    setLoading(true)
    setTabLoading(true);
    const videoResponse = category === "movies" ? await getMovieVideos(data.id) : await getSeriesVideos(data.id);
    console.log("res", videoResponse)
    const updatedResults = videoResponse.results.filter((eachVideo: IVideoResult, index: number) => eachVideo.official === true && eachVideo.site === "YouTube")
    setVideoDetails({ id: videoResponse.id, results: updatedResults.length > 0 ? [updatedResults[0]] : [] })
    if (updatedResults.length > 0 && category === "movies") {
      setTab("Trailers & More")
    }
    setTabLoading(false)
    setLoading(false)
  }

  const fetchAccountStates = async () => {
    setContentLoading(true);
    const accountStatesResponse = category === "movies" ? await getMovieAccountState(data.id) : await getSeriesAccountState(data.id);
    setAccountStates(accountStatesResponse)
    setRating(typeof accountStatesResponse?.rated === "boolean" ? 0 : accountStatesResponse?.rated.value!)
    setContentLoading(false)
  }

  const fetchCredits = async () => {
    setContentLoading(true);
    const creditsResponse: ICreditsResponse = category === "movies" ? await getMovieCredits(data.id) : await getSeriesCredits(data.id);
    setCredits({ id: creditsResponse.id, cast: category === "movies" ? creditsResponse.cast!.splice(0, 20) as IActorDetails[] : creditsResponse.cast!.splice(0, 20) as IActorDetails[] })
    setContentLoading(false)
  }

  const fetchSimilar = async () => {
    setTabLoading(true);
    const reccomendationsResponse: IReccomendation = category === "movies" ? await getSimilarMovies(data.id) : await getSimilarSeries(data.id);
    setReccomendations(reccomendationsResponse.results.splice(0, 20))
    setTabLoading(false)
  }

  const handleRating = (value: number) => {
    setRating(value)
  }

  const handleWatchlist = async () => {
    const checkCategory = category === "movies" ? "movie" : "tv"
    setContentLoading(true)
    await updateWatchlist(checkCategory, details!.id, !accountStates!.watchlist)
    await fetchAccountStates();
  }

  const handleSave = async () => {
    const ratingResponse = category === "movies" ? await addRatingMovie(details!.id, rating) : await addRatingSeries(details!.id, rating);
    setAccountStates({ ...accountStates!, rated: { value: rating } })
  }

  const fetchTab = async () => {
    switch (tab) {
      case "More Like This":
        fetchSimilar()
        break;
      case "Trailers & More":
        fetchVideos()
        break;
      default:
        fetchVideos()
    }
  }


  useEffect(() => {
    if (scrollRef !== null) {
      scrollRef.current?.scrollTo({ x: 0, y: 0 })
    }
    fetchDetails();
    fetchVideos();
    fetchAccountStates()
    fetchCredits()
    fetchTab()
  }, [data])


  const imageStyle: ImageStyle = {
    ...fullWidth,
    height: Dimensions.get("screen").height * .3,
    borderRadius: sw32,
  }

  const genreContainer: ViewStyle = {
    ...border(colorWhite._1, sw1, sw24),
    ...px(sw12),
    ...py(sh4)
  }

  const castStyle: ImageStyle = {
    borderRadius: sw24,
    height: Dimensions.get("screen").height * .2,
    width: Dimensions.get("screen").width * .25,
  }

  const trailerIndex: number = videoDetails !== undefined && videoDetails.results.length > 0 ? videoDetails.results.findIndex((video: IVideoResult) => video.type === "Trailer") : -1;
  const videoIndex: number = videoDetails !== undefined && trailerIndex === -1 ? videoDetails.results.findIndex((video: IVideoResult) => video.type === "Teaser") : trailerIndex;

  const runtimeHours = details !== undefined && details.runtime !== undefined ? parseInt(details.runtime / 60, 10) : 0;
  const runtimeMinutes = details !== undefined && details.runtime !== undefined ? details?.runtime % 60 : 0;
  const checkAccountStateWatchlist = accountStates?.watchlist === true ? "check" : "plus"
  const checkWatchlistIcon = accountStates !== undefined ? checkAccountStateWatchlist : "plus"
  const checkAirDate = details !== undefined && category === "tv" && details.first_air_date !== undefined ? details.first_air_date : ""
  const checkReleaseDate = details !== undefined && category === "movies" && details.release_date !== undefined ? details!.release_date! : checkAirDate;
  const checkName = details !== undefined && details.name !== undefined ? details.name : ""
  const checkTitle = details !== undefined && details.title !== undefined ? details.title : checkName;
  const checkRating = accountStates !== undefined && accountStates.rated.value !== undefined ? accountStates.rated.value : 0
  const checkCurrentRating = rating !== 0 ? rating : checkRating;

  let content: JSX.Element = <View />
  if (tab === "Trailers & More") {
    content = <TrailersMore category={category} id={details !== undefined ? details!.id : undefined} />
  }
  if (tab === "More Like This") {
    content = <MoreLikeThis category={category} data={recommendations} navigation={navigation} />
  }
  if (tab === "Seasons") {
    content = <Episodes data={details?.seasons} id={details!.id} />
  }

  if (videoDetails?.results.length === 0) {
    tabsArray.splice(0, 1)
  }

  if (hasSeasons === true) {
    tabsArray.splice(0, 0, "Seasons");
  }


  return (
    <SafeAreaPage>
      <View style={{ ...flexChild, ...px(sw24), backgroundColor: colorGray._5 }}>
        <ScrollView contentContainerStyle={flexGrow} ref={scrollRef} showsVerticalScrollIndicator={false}>
          <View style={flexChild}>
            <CustomSpacer space={sh16} />
            <View style={{ ...flexRow, ...centerVertical }}>
              <IconButton color={colorWhite._1} onPress={handleBack} type={Ionicons} name="arrow-back" size={sw80} />
              <CustomSpacer isHorizontal={true} space={sw24} />
              <Text style={fs24BoldWhite1}>Details</Text>
            </View>
            <CustomSpacer space={sh16} />
            {loading === true ? (
              <View style={{ ...flexChild, ...flexColCC }}>
                <ActivityIndicator size={"large"} />
              </View>
            ) : (
              <Fragment>
                {error === true || videoDetails === undefined || category === "tv" || videoIndex === -1 ? (
                  <Image source={{ uri: `${IMAGE_URL_CAROUSEL}${details?.poster_path}` }} style={imageStyle} resizeMethod="scale" resizeMode="stretch" />
                ) : (
                  <YoutubePlayer
                    forceAndroidAutoplay={true}
                    height={Dimensions.get("screen").height * 0.3}
                    play={false}
                    videoId={videoDetails!.results[videoIndex].key}
                    webViewStyle={{ opacity: 0.99 }}
                  />
                )}
              </Fragment>
            )}
            <CustomSpacer space={sh16} />
            {contentLoading === true ? (
              <View style={{ ...flexChild, ...flexColCC }}>
                <ActivityIndicator size={"large"} />
              </View>
            ) : (
              <View style={flexChild}>
                {details !== undefined ? (
                  <View style={{ ...flexChild }}>
                    <View style={{ ...flexRow, ...centerVertical }}>
                      <View>
                        <IconButton onPress={handleWatchlist} name={checkWatchlistIcon} type={Feather} size={sw80} />
                        <Text style={fs12BoldWhite1}>My List</Text>
                      </View>
                      <CustomSpacer isHorizontal={true} space={sw56} />
                      <Text style={{ ...fs32BoldWhite1, ...flexChild, ...flexWrap }}>{checkTitle}</Text>
                      <View>
                        <CustomSpacer space={sh4} />
                        <Text style={fs12BoldWhite1}>Rating</Text>
                        <CustomSpacer space={sh4} />
                        <Text style={fs12BoldWhite1}>{details.vote_average}</Text>
                      </View>
                      <CustomSpacer isHorizontal={true} space={sw56} />
                    </View>
                    <CustomSpacer space={sh16} />
                    <View style={{ ...flexRow, ...centerVertical }}>
                      <Text style={fs16BoldWhite1}>{checkReleaseDate!.slice(0, 4)}</Text>
                      <CustomSpacer isHorizontal={true} space={sw24} />
                      {category === "movies" ? (
                        <Fragment>
                          <Text style={fs16BoldWhite1}>{`${runtimeHours}h ${runtimeMinutes}min`}</Text>
                          <CustomSpacer isHorizontal={true} space={sw24} />
                        </Fragment>
                      ) : null}
                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {details.genres.map((eachGenre, genreIndex) => {
                          return (
                            <Fragment key={genreIndex}>
                              {genreIndex !== 0 ? <CustomSpacer isHorizontal={true} space={sw16} /> : null}
                              <View style={genreContainer}>
                                <Text style={fs16BoldWhite1}>{eachGenre.name}</Text>
                              </View>
                            </Fragment>
                          )
                        })}
                      </ScrollView>
                    </View>
                    <CustomSpacer space={sh16} />
                    <View>
                      <Text style={fs16BoldWhite1}>{details.overview}</Text>
                    </View>
                    <View style={{ ...flexChild, ...centerVertical }}>
                      <Rating
                        fractions={1}
                        imageSize={30}
                        jumpValue={0.5}
                        onFinishRating={handleRating}
                        ratingBackgroundColor={colorTransparent}
                        ratingCount={10}
                        showRating={true}
                        startingValue={checkCurrentRating}
                        tintColor={colorGray._5}
                        type="star"
                      />
                      {rating !== accountStates?.rated.value && rating !== 0 ? (
                        <Fragment>
                          <CustomSpacer space={sh16} />
                          <RoundedButton buttonStyle={{ backgroundColor: colorGreen._1 }} text='Save' onPress={handleSave} textStyle={{ color: colorWhite._1 }} />
                        </Fragment>
                      ) : null}
                    </View>
                  </View>
                ) : null}
              </View>)}
            <CustomSpacer space={sh16} />
            <Text style={fs24BoldWhite1}>Cast</Text>
            <CustomSpacer space={sh16} />
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={{ ...flexChild, ...flexRow }}>
                {credits.cast.map((eachCast: IActorDetails, castIndex: number) => {

                  const handleCast = () => {
                    dispatch(updateCurrentActor({ data: eachCast }))
                    navigation.navigate("Actor")
                  }
                  return (
                    <Fragment key={castIndex}>
                      {castIndex !== 0 ? <CustomSpacer isHorizontal={true} space={sw24} /> : null}
                      <Pressable onPress={handleCast}>
                        <Image source={{ uri: `${IMAGE_URL_CAST}${eachCast.profile_path}` }} style={castStyle} />
                        <View style={{ maxWidth: Dimensions.get("screen").width * .25 }}>
                          <Text style={{ ...fs16BoldWhite1, ...flexWrap }}>{eachCast.character}</Text>
                          <CustomSpacer space={sh4} />
                          <Text style={{ ...fs12BoldWhite1, ...flexWrap }}>{eachCast.original_name}</Text>
                        </View>
                      </Pressable>
                    </Fragment>
                  )
                })}
              </View>
            </ScrollView>
            <CustomSpacer space={sh24} />
            <View style={{ ...flexChild, ...flexRow, borderTopColor: colorGray._4, borderTopWidth: 1 }}>
              {tabsArray.map((eachTab: TTabs, tabIndex: number) => {

                const handleTab = () => {
                  setTab(eachTab)
                }
                const selectedStyle: ViewStyle = eachTab === tab ? { borderTopColor: colorGreen._1, borderTopWidth: 4 } : {}
                return (
                  <Pressable key={tabIndex} onPress={handleTab} style={{ ...flexColCC, ...py(sh4), ...flexChild, ...selectedStyle }}>
                    <Text style={{ ...fs18BoldBlack2, color: colorWhite._1 }}>{eachTab}</Text>
                  </Pressable>
                )
              })}
            </View>
            <CustomSpacer space={sh16} />
            {tabLoading === true ? <View style={{ ...flexChild, ...flexColCC }}>
              <ActivityIndicator size={"large"} />
            </View> : content}
          </View>
          <CustomSpacer space={sh100} />
        </ScrollView>
      </View >
    </SafeAreaPage >
  )
}
