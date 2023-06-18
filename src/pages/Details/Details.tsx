import React, { Fragment, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, ImageStyle, ScrollView, Text, View, ViewStyle } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";
import Feather from 'react-native-vector-icons/Feather';
import { Rating } from 'react-native-ratings';


import { useAppDispatch, useAppSelector } from '../../store';
import { CustomButton, CustomFlexSpacer, CustomSpacer, Icon, IconButton, MovieCard, RoundedButton, SafeAreaPage } from '../../components';
import { border, centerHorizontal, centerVertical, colorGray, colorGreen, colorTransparent, colorWhite, flexChild, flexColCC, flexGrow, flexRow, flexRowCC, flexWrap, fs10BoldWhite1, fs12BoldWhite1, fs16BoldWhite1, fs24BoldWhite1, fs32BoldWhite1, fullWidth, px, py, sh16, sh24, sh4, sh8, sw1, sw100, sw12, sw16, sw20, sw24, sw32, sw4, sw48, sw56, sw8, sw80 } from '../../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LocalAssets } from '../../assets/images/LocalAssets';
import { IMAGE_URL_CARD, IMAGE_URL_CAROUSEL } from '../../constants';
import { addRatingMovie, addToWatchlist, getMovieAccountState, getMovieDetails, getMovieVideos, getSeriesAccountState, getSeriesDetails, getSeriesVideos, updateWatchlist } from '../../network-actions';

type IDetailsProps = DetailsScreenProps

export const Details = ({ navigation }: IDetailsProps) => {
  const [details, setDetails] = useState<IMovieDetails | undefined>(undefined)
  const [videoDetails, setVideoDetails] = useState<IMovieVideos | undefined>(undefined)
  const [accountStates, setAccountStates] = useState<IAccountStates | undefined>(undefined)
  const [rating, setRating] = useState<number>(0)
  const [playing, setPlaying] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [contentLoading, setContentLoading] = useState<boolean>(true)
  // const videoRef = useRef<Video>(null)
  const dispatch = useAppDispatch();
  const detailsState: IItem = useAppSelector((state) => state.globalState.currentItem) as IItem
  const { category, data } = detailsState

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
    setContentLoading(false)
  }

  const fetchVideos = async () => {
    setLoading(true);
    const videoResponse = category === "movies" ? await getMovieVideos(data.id) : await getSeriesVideos(data.id);
    const updatedResults = videoResponse.results.filter((eachVideo: IVideoResult, index: number) => eachVideo.official === true)
    setVideoDetails({ id: videoResponse.id, results: updatedResults })
    setLoading(false);
  }

  const fetchAccountStates = async () => {
    setContentLoading(true);
    const accountStatesResponse = category === "movies" ? await getMovieAccountState(data.id) : await getSeriesAccountState(data.id);
    console.log("'acc", accountStatesResponse)
    setAccountStates(accountStatesResponse)
    setRating(accountStatesResponse?.rated.value!)
    setContentLoading(false)
  }



  const handleVideoStateChange = (event: string) => {

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
    setContentLoading(true)
    const ratingResponse = await addRatingMovie(details!.id, rating);
    setAccountStates({ ...accountStates!, rated: { value: rating } })
    setContentLoading(false)
  }

  useEffect(() => {
    fetchDetails();
    fetchVideos()
    fetchAccountStates()
  }, [])


  const imageStyle: ImageStyle = {
    ...fullWidth,
    height: Dimensions.get("screen").height * .3,
    borderRadius: sw32,
    // backgroundColor: "red"
  }

  const genreContainer: ViewStyle = {
    ...border(colorWhite._1, sw1, sw24),
    ...px(sw12),
    ...py(sh4)

  }

  const trailerIndex: number = videoDetails !== undefined ? videoDetails.results.findIndex((video: IVideoResult) => video.type === "Trailer") : -1;
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


  return (
    <SafeAreaPage>
      <View style={{ ...flexChild, ...px(sw24), backgroundColor: colorGray._5 }}>
        <ScrollView contentContainerStyle={flexGrow} showsVerticalScrollIndicator={false}>
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
                {error === true || videoDetails === undefined || category === "tv" ? (
                  <Image source={{ uri: `${IMAGE_URL_CAROUSEL}${details?.poster_path}` }} style={imageStyle} resizeMethod="scale" resizeMode="stretch" />
                ) : (
                  <YoutubePlayer
                    forceAndroidAutoplay={true}
                    height={Dimensions.get("screen").height * 0.3}
                    play={playing}
                    videoId={videoDetails!.results[videoIndex].key}
                    onChangeState={handleVideoStateChange}
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
                            <Fragment>
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
                      {rating !== accountStates?.rated.value || accountStates.rated.value === 0 ? (
                        <Fragment>
                          <CustomSpacer space={sh16} />
                          <RoundedButton buttonStyle={{ backgroundColor: colorGreen._1 }} text='Save' onPress={handleSave} textStyle={{ color: colorWhite._1 }} />
                        </Fragment>
                      ) : null}
                    </View>
                  </View>
                ) : null}
              </View>)}
            <CustomSpacer space={Dimensions.get("screen").height * .4} />
          </View>
        </ScrollView>
      </View >
    </SafeAreaPage >
  )
}
