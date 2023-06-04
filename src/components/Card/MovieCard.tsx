import React, { Fragment } from "react";
import { Dimensions, GestureResponderEvent, Pressable, TouchableOpacity, View, ViewStyle } from "react-native";
import FastImage from "react-native-fast-image";
import { sw4, sh8, colorBlack, sw8, sw32 } from "../../styles";


interface IMovieCardProps {
  posterPath?: string | null;
  style?: ViewStyle;
}

export const MovieCard = ({ posterPath, style: inputStyle }: IMovieCardProps): JSX.Element => {
  const movieCard: ViewStyle = {
    height: Dimensions.get("screen").height * .6,
    width: Dimensions.get("screen").width * .49,
    marginHorizontal: sw4,
    marginBottom: sh8,
  };

  return (
    <View style={movieCard}>
      <Pressable >
        <FastImage
          source={{ uri: `https://image.tmdb.org/t/p/original${posterPath}` }}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: sw32,
          }}
          resizeMode="stretch"
        />
      </Pressable>
    </View>
  );
};
