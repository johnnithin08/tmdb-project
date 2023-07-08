import React, { Fragment, FunctionComponent, lazy, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Text, View, ViewStyle } from 'react-native'

import { border, colorWhite, flexChild, flexColCC, flexRow, flexRowCC, flexWrap, fs16BoldWhite1, px, py, sh12, sh16, sh24, sh300, sh8, sw1, sw24, sw32, sw40, sw56 } from '../../styles'
import { CustomFlexSpacer, CustomSpacer, LabeledTitle, MovieCard, NewDropdown } from '../../components';
import { getSeasonDetails } from '../../network-actions';

interface IEpisodesProps {
  data?: ISeasons[];
  id?: number;
}

interface TCurrentSeason {
  name: string;
  number: number;
}

export const Episodes: FunctionComponent<IEpisodesProps> = ({ data, id }: IEpisodesProps) => {
  const [season, setSeason] = useState<TCurrentSeason>({ name: "Season 1", number: 1 })
  const [loading, setLoading] = useState<boolean>(true)
  const [seasonData, setSeasonData] = useState<IEpisode[]>([])


  const seasonArray: TypeLabelValue[] = data !== undefined ? [...data]!.filter((eachData: ISeasons) => eachData.season_number >= 1).map((_eachData, dataIndex) => ({ label: `Season ${dataIndex + 1}`, value: `Season ${dataIndex + 1}` })) : []

  const handleSeason = (value: string) => {
    const findIndex = seasonArray.findIndex((eachData: TypeLabelValue) => eachData.label === value)
    setSeason({ ...season, name: value, number: findIndex + 1 })
  }

  const fetchSeasonData = async () => {
    setLoading(true);
    const seasonDetailsResponse: ISeasonData = await getSeasonDetails(id, season.number)
    setSeasonData(seasonDetailsResponse.episodes)
    setLoading(false)
  }

  useEffect(() => {
    fetchSeasonData()
  }, [season])

  const cardStyle: ViewStyle = {
    ...flexChild,
    ...flexRow,
    ...border(colorWhite._1, 1, sw32),
    ...px(sw32),
    ...py(sh12),
  }

  return (
    <View style={{ ...flexChild, minHeight: sh300 }}>
      <NewDropdown placeholder='Select Season' handleChange={handleSeason} items={seasonArray} value={season.name} viewStyle={{ width: Dimensions.get("screen").width * .7, borderRadius: sw40 }} />
      <CustomSpacer space={sh16} />
      {seasonData.length > 0 && loading === false ? (
        <View style={flexChild}>
          {seasonData.map((eachEpisode: IEpisode, episodeIndex: number) => {
            return (
              <Fragment key={episodeIndex}>
                {episodeIndex !== 0 ? <CustomSpacer space={sh12} /> : null}
                <View key={episodeIndex} style={cardStyle}>
                  <MovieCard handlePress={() => { }} imageStyle={{ borderRadius: 0 }} movieCardStyle={{ width: Dimensions.get("screen").width * 0.3, height: Dimensions.get("screen").height * .25 }} posterPath={eachEpisode.still_path} />
                  <CustomSpacer isHorizontal={true} space={sw24} />
                  <View style={flexChild}>
                    <View style={{ ...flexRow, ...flexChild }}>
                      <LabeledTitle label="Name" title={eachEpisode.name} titleStyle={flexWrap} style={{ maxWidth: Dimensions.get("screen").width * .35 }} />
                      <CustomFlexSpacer />
                      <LabeledTitle label="Runtime" title={`${eachEpisode.runtime} min`} />
                    </View>
                    <CustomSpacer space={sh12} />
                    <View style={{ ...flexRow, ...flexChild }}>
                      <LabeledTitle label="Air Date" title={eachEpisode.air_date} />
                      <CustomFlexSpacer />
                      <LabeledTitle label="Rating" title={eachEpisode.vote_average.toString()} />
                    </View>
                    <CustomSpacer space={sh12} />
                    <Text style={{ ...fs16BoldWhite1, ...flexWrap }}>{eachEpisode.overview}</Text>
                  </View>
                </View>
              </Fragment>
            )
          })}

        </View>
      ) : (
        <View style={{ ...flexChild, ...flexColCC }}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </View>
  )
}



