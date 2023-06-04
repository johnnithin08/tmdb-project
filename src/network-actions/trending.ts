import { API_KEY, BASE_URL } from "../constants";
import axios from "axios"

export const getTrending = async (): Promise<ITrending[]> => {
  const trendingUrl = `${BASE_URL}/trending/all/week?api_key=${API_KEY}`
  const trendingResponse = await axios.get(trendingUrl)
  return trendingResponse.data.results;

}