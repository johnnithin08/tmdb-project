import axios from "axios"
import { API_KEY, BASE_URL } from "../constants"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const getMovieDetails = async (id: number): Promise<IMovieDetails> => {
  const detailsUrl = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  const movieDetailsResponse = await axios.get(detailsUrl)
  return movieDetailsResponse.data
}

export const getSeriesDetails = async (id: number): Promise<IMovieDetails> => {
  const detailsUrl = `${BASE_URL}/tv/${id}?api_key=${API_KEY}`
  const movieDetailsResponse = await axios.get(detailsUrl)
  return movieDetailsResponse.data
}

export const getMovieVideos = async (id: number): Promise<IMovieVideos> => {
  const detailsUrl = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
  const movieDetailsResponse = await axios.get(detailsUrl)
  return movieDetailsResponse.data
}

export const getSeriesVideos = async (id: number): Promise<IMovieVideos> => {
  const detailsUrl = `${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`
  const movieDetailsResponse = await axios.get(detailsUrl)
  return movieDetailsResponse.data
}

export const getMovieAccountState = async (id: number): Promise<IAccountStates | undefined> => {
  const sessionId = await AsyncStorage.getItem('currentSession')
  const accountStatesUrl = `${BASE_URL}/movie/${id}/account_states?api_key=${API_KEY}&session_id=${sessionId}`
  try {

    const accountStatesResponse = await axios.get(accountStatesUrl)
    console.log("resp", accountStatesResponse)
    return accountStatesResponse.data
  }
  catch (err) {
    console.log("err", err)
  }
}

export const getSeriesAccountState = async (id: number): Promise<IAccountStates> => {
  const sessionId = await AsyncStorage.getItem('currentSession')
  const accountStatesUrl = `${BASE_URL}/tv/${id}/account_states?api_key=${API_KEY}&session_id=${sessionId}`
  const accountStatesResponse = await axios.get(accountStatesUrl)
  return accountStatesResponse.data
}

export const addRatingMovie = async (movieId: number, value: number): Promise<IAccountStates | undefined> => {
  const sessionId = await AsyncStorage.getItem('currentSession')
  const accountStatesUrl = `${BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`
  try {

    const addRatingResponse = await axios.post(accountStatesUrl, { value: value })
    console.log("resp", addRatingResponse)
    return addRatingResponse.data
  }
  catch (err) {
    console.log("err", err)
  }
}

export const addRatingSeries = async (id: number): Promise<IAccountStates> => {
  const sessionId = await AsyncStorage.getItem('currentSession')
  const accountStatesUrl = `${BASE_URL}/tv/${id}/account_states?api_key=${API_KEY}&session_id=${sessionId}`
  const accountStatesResponse = await axios.get(accountStatesUrl)
  return accountStatesResponse.data
}