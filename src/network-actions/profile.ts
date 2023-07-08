import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"

import { API_KEY, BASE_URL } from "../constants";

export const getAccountDetails = async (sessionId: string): Promise<IUser | undefined> => {
  const accountDetailsUrl = `${BASE_URL}/account/1?api_key=${API_KEY}&session_id=${sessionId}`
  try {

    const accountDetailsResponse = await axios.get(accountDetailsUrl)
    return accountDetailsResponse.data;
  }
  catch (err) {
    console.log("err", err)
  }
}