declare interface IPillsWithSubLabel {
  label: string;
  labelStyle?: import("react-native").TextStyle;
  subLabel?: string;
  subLabelStyle?: import("react-native").TextStyle;
  value?: string;
}

declare interface IPillsCustomContent {
  buttonStyle?: import("react-native").ViewStyle;
  circleStyle?: import("react-native").ViewStyle;
  disabledBackground?: import("react-native").ViewStyle;
  disabledStyle?: import("react-native").ViewStyle;
  fontFamily?: "NunitoSans-Bold" | "NunitoSans-Regular";
  iconColor?: string;
  iconSize?: number;
  label: string;
  labelStyle?: import("react-native").ViewStyle;
  mainLabelStyle?: import("react-native").ViewStyle;
  selected: boolean;
  textContainer?: import("react-native").ViewStyle;
}