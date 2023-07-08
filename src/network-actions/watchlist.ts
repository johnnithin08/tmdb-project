import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { API_KEY, BASE_URL, WATCHLIST_URL } from "../constants";

export const updateWatchlist = async (type: string, id: number, watchlist: boolean): Promise<any> => {
  const accountId = await AsyncStorage.getItem('accountId')
  const sessionId = await AsyncStorage.getItem('currentSession')
  const watchlistMoviesUrl = `${WATCHLIST_URL}${accountId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`
  try {
    const watchlistMoviesResponse = await axios.post(watchlistMoviesUrl, {
      media_type: type,
      media_id: id,
      watchlist: watchlist
    })
    return watchlistMoviesResponse.data;
  }
  catch (err) {
    console.log("err", err)
    return []
  }
}

export const getWatchlistMovies = async (): Promise<IWatchlist[]> => {
  const accountId = await AsyncStorage.getItem('accountId')
  const sessionId = await AsyncStorage.getItem('currentSession')
  const watchlistMoviesUrl = `${WATCHLIST_URL}${accountId}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}`
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
  const watchlistSeriesUrl = `${WATCHLIST_URL}${accountId}/watchlist/tv?api_key=${API_KEY}&session_id=${sessionId}`
  try {
    const watchlistMoviesResponse = await axios.get(watchlistSeriesUrl)
    return watchlistMoviesResponse.data.results;
  }
  catch (err) {
    console.log("err", err)
    return []
  }
}