import React, { Fragment } from "react";
import { Dimensions, GestureResponderEvent, Image, Pressable, TouchableOpacity, View, ViewStyle } from "react-native";
import FastImage from "react-native-fast-image";
import { sw4, sh8, colorBlack, sw8, sw32 } from "../../styles";
import { IMAGE_URL_CARD, } from "../../constants";
import { LocalAssets } from "../../assets/images/LocalAssets";


interface IMovieCardProps {
  handlePress: () => void;
  movieCardStyle?: ViewStyle;
  posterPath?: string | null;
}

export const MovieCard = ({ handlePress, movieCardStyle, posterPath }: IMovieCardProps): JSX.Element => {
  const movieCard: ViewStyle = {
    height: Dimensions.get("screen").height * .25,
    width: Dimensions.get("screen").width * .48,
    marginHorizontal: sw8,
    marginBottom: sh8,
    ...movieCardStyle
  };

  return (
    <View style={movieCard}>
      <Pressable onPress={handlePress}>
        <FastImage
          defaultSource={LocalAssets.imageLoader}
          source={{ uri: `${IMAGE_URL_CARD}${posterPath}` }}
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
