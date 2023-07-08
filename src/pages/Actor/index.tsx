import React, { Fragment, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, ImageStyle, Pressable, ScrollView, Text, View, ViewStyle } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";
import Feather from 'react-native-vector-icons/Feather';
import { Rating } from 'react-native-ratings';


import { useAppDispatch, useAppSelector } from '../../store';
import { CustomButton, CustomFlexSpacer, CustomSpacer, Icon, IconButton, LabeledTitle, MovieCard, RoundedButton, SafeAreaPage } from '../../components';
import { border, centerHorizontal, centerVertical, colorGray, colorGreen, colorTransparent, colorWhite, flexChild, flexColCC, flexGrow, flexRow, flexRowCC, flexWrap, fs10BoldWhite1, fs12BoldWhite1, fs16BoldWhite1, fs18BoldBlack2, fs24BoldWhite1, fs32BoldWhite1, fullHeight, fullWidth, px, py, sh100, sh12, sh16, sh24, sh4, sh8, sw1, sw100, sw12, sw16, sw20, sw24, sw32, sw4, sw48, sw56, sw62, sw8, sw80 } from '../../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LocalAssets } from '../../assets/images/LocalAssets';
import { IMAGE_URL_CARD, IMAGE_URL_CAROUSEL } from '../../constants';
import { getActorDetails } from '../../network-actions';

type IDetailsProps = DetailsScreenProps
type TTabs = "Seasons" | "More Like This" | "Trailers & More"

export const Actor = ({ navigation }: IDetailsProps) => {
  const [details, setDetails] = useState<IActor | undefined>(undefined)
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
  const detailsState: IActorItem = useAppSelector((state) => state.globalState.currentActor) as IActorItem
  const { data } = detailsState

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

  const fetchActorDetails = async () => {
    setLoading(true)
    const detailsResponse = await getActorDetails(data.id)
    setDetails(detailsResponse)
    setLoading(false)
  }


  useEffect(() => {
    fetchActorDetails();
  }, [data])


  const imageStyle: ImageStyle = {
    height: Dimensions.get("screen").height * .35,
    width: Dimensions.get("screen").height * .35,
    borderRadius: 200,
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

  const trailerIndex: number = videoDetails !== undefined ? videoDetails.results.findIndex((video: IVideoResult) => video.type === "Trailer") : -1;
  const videoIndex: number = videoDetails !== undefined && trailerIndex === -1 ? videoDetails.results.findIndex((video: IVideoResult) => video.type === "Teaser") : trailerIndex;

  //   const runtimeHours = details !== undefined && details.runtime !== undefined ? parseInt(details.runtime / 60, 10) : 0;
  //   const runtimeMinutes = details !== undefined && details.runtime !== undefined ? details?.runtime % 60 : 0;
  //   const checkAccountStateWatchlist = accountStates?.watchlist === true ? "check" : "plus"
  //   const checkWatchlistIcon = accountStates !== undefined ? checkAccountStateWatchlist : "plus"
  //   const checkAirDate = details !== undefined && category === "tv" && details.first_air_date !== undefined ? details.first_air_date : ""
  //   const checkReleaseDate = details !== undefined && category === "movies" && details.release_date !== undefined ? details!.release_date! : checkAirDate;
  //   const checkName = details !== undefined && details.name !== undefined ? details.name : ""
  //   const checkTitle = details !== undefined && details.title !== undefined ? details.title : checkName;
  //   const checkRating = accountStates !== undefined && accountStates.rated.value !== undefined ? accountStates.rated.value : 0
  //   const checkCurrentRating = rating !== 0 ? rating : checkRating;

  let content: JSX.Element = <View />
  //   if (tab === "Trailers & More") {
  //     content = <TrailersMore data={videoDetails?.results} />
  //   }
  //   if (tab === "More Like This") {
  //     content = <MoreLikeThis category={category} data={recommendations} navigation={navigation} />
  //   }
  //   if (tab === "Seasons") {
  //     content = <Episodes data={details?.seasons} id={details!.id} />
  //   }

  //   if (videoDetails?.results.length === 0) {
  //     tabsArray.splice(0, 1)
  //   }

  if (hasSeasons === true) {
    tabsArray.splice(0, 0, "Seasons");
  }

  const containerStyle: ViewStyle = {
    ...flexRow,
    ...centerVertical,
    borderRadius: sw80,
    backgroundColor: colorGray._4,
    ...px(sh16),
    ...py(sh12)
  }


  return (
    <SafeAreaPage>
      <View style={{ ...flexChild, ...px(sw24), backgroundColor: colorGray._5 }}>
        <ScrollView contentContainerStyle={flexGrow} ref={scrollRef} showsVerticalScrollIndicator={false}>
          <View style={flexChild}>
            <CustomSpacer space={sh16} />
            <View style={flexRow}>
              <IconButton color={colorWhite._1} onPress={handleBack} type={Ionicons} name="arrow-back" size={sw80} />
            </View>
            <CustomSpacer space={sh16} />
            {loading === true ? (
              <View style={{ ...flexChild, ...flexColCC }}>
                <ActivityIndicator size={"large"} />
              </View>
            ) : (
              <View style={flexChild}>
                <View style={centerVertical}>
                  <Image source={{ uri: `${IMAGE_URL_CAROUSEL}${details?.profile_path}` }} style={imageStyle} resizeMethod="scale" resizeMode="center" />
                </View>
                <CustomSpacer space={sh16} />
                <View style={centerVertical}>
                  <Text style={fs24BoldWhite1}>{details?.name}</Text>
                  <Text style={fs16BoldWhite1}>{details?.place_of_birth}</Text>
                </View>
                <CustomSpacer space={sh16} />
                <View style={containerStyle}>
                  <LabeledTitle label={"Gender"} title={details?.gender === 1 ? "Female" : "Male"} />
                  <CustomFlexSpacer />
                  <View style={{ width: 1, backgroundColor: colorWhite._1, ...fullHeight }} />
                  <CustomFlexSpacer />
                  <LabeledTitle label={"Birthday"} title={details?.birthday} />
                  <CustomFlexSpacer />
                  <View style={{ width: 1, backgroundColor: colorWhite._1, ...fullHeight }} />
                  <CustomFlexSpacer />
                  <LabeledTitle label={"Known for"} title={details?.known_for_department} />
                  <CustomFlexSpacer />
                  <View style={{ width: 1, backgroundColor: colorWhite._1, ...fullHeight }} />
                  <CustomFlexSpacer />
                  <LabeledTitle label={"Popularity"} title={`${details?.popularity}%`} />
                </View>
                <CustomSpacer space={sh16} />
                <Text style={fs24BoldWhite1}>Biography</Text>
                <CustomSpacer space={sh16} />
                <Text style={fs16BoldWhite1}>{details?.biography}</Text>
                <CustomSpacer space={100} />
              </View>
            )}
          </View>
        </ScrollView>
      </View >
    </SafeAreaPage >
  )
}
