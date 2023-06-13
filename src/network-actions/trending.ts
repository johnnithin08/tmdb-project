import { API_KEY, BASE_URL } from "../constants";
import axios from "axios"

export const getTrendingMovies = async (): Promise<ITrending[]> => {
  const trendingUrl = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  const trendingResponse = await axios.get(trendingUrl)
  return trendingResponse.data.results;
}

export const getTrendingTvSeries = async (): Promise<ITrending[]> => {
  const trendingUrl = `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`
  const trendingResponse = await axios.get(trendingUrl)
  return trendingResponse.data.results;
}