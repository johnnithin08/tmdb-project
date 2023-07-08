import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import {
  border,
  centerVertical,
  colorBlue,
  flexRow,
  fs10RegBlue9,
  fs12BoldGray6,
  fs12BoldWhite1,
  fs14RegBlack1,
  fs16BoldBlack1,
  fs16BoldWhite1,
  fs16RegGray6,
  fs16RegWhite1,
  px,
  rowCenterVertical,
  sw05,
  sw12,
  sw4,
  sw8,
} from "../../styles";
import { CustomSpacer } from "./Spacer";

export const LabeledTitle: FunctionComponent<LabeledTitleProps> = ({
  iconSize,
  headerSideContent,
  headerSideText,
  label,
  labelStyle,
  onPress,
  spaceToBottom,
  spaceToIcon,
  spaceToLabel,
  style,
  subtitle,
  subtitleStyle,
  title,
  titleIcon,
  titleIconStyle,
  titleNumberOfLines,
  titlePrefix,
  titlePrefixStyle,
  titleStyle,
}: LabeledTitleProps) => {
  const defaultIconSpace = spaceToIcon !== undefined ? spaceToIcon : sw12;
  return (
    <Fragment>
      <View style={style}>
        <View style={rowCenterVertical}>
          <Text style={{ ...fs12BoldWhite1, ...labelStyle }}>{label}</Text>
          {headerSideContent !== undefined ? (
            headerSideContent
          ) : (
            <Fragment>
              {headerSideText !== undefined ? (
                <Fragment>
                  <CustomSpacer isHorizontal={true} space={sw8} />
                  <View style={{ ...border(colorBlue._9, sw05, sw4), ...px(sw4) }}>
                    <Text style={fs10RegBlue9}>{headerSideText}</Text>
                  </View>
                </Fragment>
              ) : null}
            </Fragment>
          )}
        </View>
        {spaceToLabel === undefined ? null : <CustomSpacer space={spaceToLabel} />}
        <View style={flexRow}>
          {titlePrefix !== undefined ? (
            <Fragment>
              <Text style={{ ...fs16RegWhite1, ...titlePrefixStyle }}>{titlePrefix}</Text>
              <CustomSpacer isHorizontal={true} space={sw4} />
            </Fragment>
          ) : null}
          {title !== undefined ? (
            <Text style={{ ...fs16BoldWhite1, ...titleStyle }} numberOfLines={titleNumberOfLines}>
              {title !== "" ? title : "-"}
            </Text>
          ) : null}
        </View>
        {subtitle !== undefined ? <Text style={{ ...fs14RegBlack1, ...subtitleStyle }}>{subtitle}</Text> : null}
        {spaceToBottom === undefined ? null : <CustomSpacer space={spaceToBottom} />}
      </View>
    </Fragment>
  );
};
