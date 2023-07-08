

import React, { FunctionComponent, useState } from 'react'
import { Dimensions, Text, View } from 'react-native'

import { MovieCard } from '../../components';
import { updateCurrentItem, useAppDispatch } from '../../store';
import { flexChild, flexRow, flexWrap } from '../../styles';

interface IMoreLikeThis {
  data: IMovie[];
  navigation: DetailsNavigationProp;
  category: "movies" | "tv";
}

export const MoreLikeThis: FunctionComponent<IMoreLikeThis> = ({ category, data, navigation }: IMoreLikeThis) => {

  const dispatch = useAppDispatch()
  return (
    <View style={{ ...flexChild, ...flexRow, ...flexWrap }}>
      {data.map((movie: IMovie, index: number) => {

        const handleSelectMovie = () => {
          dispatch(updateCurrentItem({ category: category, data: movie }))
          navigation.navigate("Details")
        }
        return (
          <MovieCard key={index} handlePress={handleSelectMovie} movieCardStyle={{ width: Dimensions.get("screen").width * 0.46 }} posterPath={movie.poster_path} />
        )
      })}
    </View>
  )
}

