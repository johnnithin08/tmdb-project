import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Text, View } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";

import { flexChild, flexColCC, fs16BoldWhite1, sh24, sh8 } from '../../styles'
import { CustomSpacer } from '../../components';
import { getMovieVideos, getSeriesVideos } from '../../network-actions';

interface IMoreLikeThis {
  category: "movies" | "tv";
  id?: number;
}

export const TrailersMore = ({ category, id }: IMoreLikeThis) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [videos, setVideos] = useState<IVideoResult[]>([])

  const fetchVideos = async () => {
    if (id !== undefined) {
      setLoading(true)
      const videoResponse = category === "movies" ? await getMovieVideos(id) : await getSeriesVideos(id);
      const updatedResults = videoResponse.results.filter((eachVideo: IVideoResult, index: number) => eachVideo.official === true && eachVideo.site === "YouTube")
      setVideos(updatedResults)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      fetchVideos()
    }
  }, [id])
  return (
    <View style={flexChild}>
      {videos.length > 0 && id !== undefined ? videos.map((eachData: IVideoResult, dataIndex: number) => {
        return (
          <View key={dataIndex}>
            {dataIndex !== 0 ? <CustomSpacer space={sh24} /> : null}
            <Text style={fs16BoldWhite1}>{eachData.name}</Text>
            <CustomSpacer space={sh8} />
            <YoutubePlayer
              forceAndroidAutoplay={false}
              height={Dimensions.get("screen").height * 0.3}
              play={false}
              videoId={eachData.key}
              webViewStyle={{ opacity: 0.99 }}
            />
          </View>
        )
      }) : <View style={{ ...flexChild, ...flexColCC }}>
        <ActivityIndicator size={"large"} />
      </View>}
    </View>
  )
}