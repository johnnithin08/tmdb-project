import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { API_KEY, BASE_URL } from "../constants";

export const getWatchlistMovies = async (): Promise<IWatchlist[]> => {
  const accountId = await AsyncStorage.getItem('accountId')
  const sessionId = await AsyncStorage.getItem('currentSession')
  const watchlistMoviesUrl = `${BASE_URL}/account/${accountId}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}`
  try {
    const watchlistMoviesResponse = await axios.get(watchlistMoviesUrl)
    return watchlistMoviesResponse.data.results;
  }
  catch (err) {
    console.log("err", err)
    return []
  }

}

export const getWatchlistTvSeries = async (): Promise<IWatchlist[]> => {
  const accountId = await AsyncStorage.getItem('accountId')
  const sessionId = await AsyncStorage.getItem('currentSession')
  const watchlistSeriesUrl = `${BASE_URL}/account/${accountId}/watchlist/tv?api_key=${API_KEY}&session_id=${sessionId}`
  try {
    const watchlistMoviesResponse = await axios.get(watchlistSeriesUrl)
    return watchlistMoviesResponse.data.results;
  }
  catch (err) {
    console.log("err", err)
    return []
  }
}