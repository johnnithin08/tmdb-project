import { API_KEY, BASE_URL, LOGIN_URL, SESSION_TOKEN_URL } from "../constants";
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

export const getSessionToken = async (): Promise<string> => {
  const sessionTokenResponse = await axios.get(`${BASE_URL}${SESSION_TOKEN_URL}?api_key=${API_KEY}`)
  console.log("sess", sessionTokenResponse)
  return sessionTokenResponse.data.request_token;
}

export const login = async (username: string, password: string, sessionToken: string): Promise<boolean> => {
  console.log("req", sessionToken)
  try {
    console.log("check", username.toLowerCase(), password.toLowerCase())
    const loginResponse = await axios.post(`${BASE_URL}${LOGIN_URL}?api_key=${API_KEY}`,
      {
        username: username.toLowerCase(),
        password: password.toLowerCase(),
        request_token: sessionToken,
      },
    )
    console.log("resp", loginResponse)
  }
  catch (err) {
    console.log("err", err)
    Alert.alert(err.response.data.status_message)
  }
  await AsyncStorage.setItem('currentSession', sessionToken)
  return true;
} 