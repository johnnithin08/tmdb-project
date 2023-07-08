import axios from "axios"

import { API_KEY, BASE_URL } from "../constants"


export const getMovieCredits = async (id: number) => {
  const creditsUrl = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
  const accountStatesResponse = await axios.get(creditsUrl)
  return accountStatesResponse.data
}

export const getSeriesCredits = async (id: number) => {
  const creditsUrl = `${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`
  const accountStatesResponse = await axios.get(creditsUrl)
  return accountStatesResponse.data
}