import React, { FunctionComponent, useRef, useState } from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";
import { Bar } from "react-native-progress";
import WebView from "react-native-webview";

import { IconButton, SafeAreaPage } from "../../components";
import { flexRow, px, sw24, py, sh16, colorRed, sh56, centerHV, fs16RegWhite1, flexChild, sw512, sw104, fullWidth, sw1080 } from "../../styles";
import { CustomSpacer } from "./Spacer";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";



interface IBrowserWebViewProps {
  baseUrl: string;
  handleClose: () => void;
}

export const BrowserWebView: FunctionComponent<IBrowserWebViewProps> = ({ handleClose, baseUrl }: IBrowserWebViewProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const webViewRef = useRef<WebView>(null);

  const handleBack = () => {
    if (webViewRef !== null) {
      webViewRef.current?.goBack();
    }
  };

  const handleForward = () => {
    if (webViewRef !== null) {
      webViewRef.current!.goForward();
    }
  };

  const handleAction = () => {
    if (webViewRef !== null && loading === false) {
      webViewRef.current?.reload();
    } else if (webViewRef !== null && loading === true) {
      webViewRef.current?.stopLoading();
    }
  };

  const headerStyle: ViewStyle = {
    ...flexRow,
    ...px(sw24),
    ...py(sh16),
    backgroundColor: colorRed._1,
    height: sh56,
  };
  const checkIcon = loading === true ? "warning-outline" : "refresh-outline";
  return (
    <SafeAreaPage topBackgroundColor={colorRed._1}>
      <View style={{ ...headerStyle, ...centerHV }}>
        <View style={{ ...flexRow, ...centerHV }}>
          <Pressable onPress={handleClose}>
            <Text style={fs16RegWhite1}>Done</Text>
          </Pressable>
          <CustomSpacer isHorizontal={true} space={sw24} />
          <IconButton onPress={handleBack} name="arrow-left" type={Feather} />
          <CustomSpacer isHorizontal={true} space={sw24} />
          <IconButton onPress={handleForward} name="arrow-right" type={Feather} />
          <View style={{ ...flexChild, ...centerHV }}>
            <Text style={{ ...fs16RegWhite1, ...flexChild, maxWidth: sw512 }} numberOfLines={1}>
              {url}
            </Text>
          </View>
          <CustomSpacer isHorizontal={true} space={sw104} />
          <IconButton onPress={handleAction} name={checkIcon} type={Ionicons} />
        </View>
      </View>
      {loading === true ? (
        <View style={fullWidth}>
          <Bar animated={true} animationType={"spring"} color={colorRed._1} progress={progress} width={sw1080} />
        </View>
      ) : null}
      <WebView
        ref={webViewRef}
        source={{ uri: baseUrl }}
        onLoad={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          setLoading(true);
          setUrl(nativeEvent.url);
        }}
        onLoadProgress={({ nativeEvent }) => {
          setProgress(nativeEvent.progress);
        }}
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoadEnd={() => {
          setLoading(false);
          setProgress(0);
        }}
        startInLoadingState={true}
      />
    </SafeAreaPage>
  );
};
