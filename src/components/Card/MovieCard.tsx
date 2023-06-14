import React, { Fragment } from "react";
import { Dimensions, GestureResponderEvent, Pressable, TouchableOpacity, View, ViewStyle } from "react-native";
import FastImage from "react-native-fast-image";
import { sw4, sh8, colorBlack, sw8, sw32 } from "../../styles";
import { ORIGINAL_IMAGE_URL } from "../../constants";
import { LocalAssets } from "../../assets/images/LocalAssets";


interface IMovieCardProps {
  posterPath?: string | null;
  movieCardStyle?: ViewStyle;
}

export const MovieCard = ({ posterPath, movieCardStyle }: IMovieCardProps): JSX.Element => {
  const movieCard: ViewStyle = {
    height: Dimensions.get("screen").height * .25,
    width: Dimensions.get("screen").width * .48,
    marginHorizontal: sw8,
    marginBottom: sh8,
    ...movieCardStyle
  };

  return (
    <View style={movieCard}>
      <Pressable >
        <FastImage
          defaultSource={LocalAssets.imageLoader}
          source={{ uri: `${ORIGINAL_IMAGE_URL}${posterPath}` }}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: sw32,
          }}
          // onl
          resizeMode="stretch"
        />
      </Pressable>
    </View>
  );
};
