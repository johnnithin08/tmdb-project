import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"

import { API_KEY, BASE_URL } from "../constants";

export const getAccountDetails = async (sessionId: string): Promise<any> => {
  const accountDetailsUrl = `${BASE_URL}/account/1?api_key=${API_KEY}&session_id=${sessionId}`
  try {

    const accountDetailsResponse = await axios.get(accountDetailsUrl)
    console.log("resp", accountDetailsResponse.data.id)
    return accountDetailsResponse.data.id.toString();
  }
  catch (err) {
    console.log("err", err)
  }
}