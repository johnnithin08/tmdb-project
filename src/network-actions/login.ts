import { API_KEY, BASE_URL, CREATE_SESSION_URL, LOGIN_URL, SESSION_TOKEN_URL } from "../constants";
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import { getAccountDetails } from "./profile";

export const getSessionToken = async (): Promise<string | boolean> => {
  try {
    const sessionTokenResponse = await axios.get(`${BASE_URL}${SESSION_TOKEN_URL}?api_key=${API_KEY}`)
    return sessionTokenResponse.data.request_token;
  }
  catch (err) {
    return false;
  }
}

export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const generateRequestToken = await getSessionToken()
    if (generateRequestToken !== false) {

      const loginResponse = await axios.post(`${BASE_URL}${LOGIN_URL}?api_key=${API_KEY}`,
        {
          username: username.toLowerCase(),
          password: password.toLowerCase(),
          request_token: generateRequestToken,
        },
      )
      console.log("resp", loginResponse);
      const createSessionResponse = await axios.post(`${BASE_URL}${CREATE_SESSION_URL}?api_key=${API_KEY}`,
        {
          request_token: generateRequestToken,
        },
      )
      const accountId = await getAccountDetails(createSessionResponse.data.session_id);
      await AsyncStorage.multiSet([['currentSession', createSessionResponse.data.session_id], ['accountId', accountId]])
      return true;
    }
    return false;
  }
  catch (err) {
    console.log("err", err)
    return false
  }
} 