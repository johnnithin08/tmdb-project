import { API_KEY, BASE_URL } from "../constants";
import axios from "axios"

export const getTvSeriesList = async (tvSeriesListCategory: string): Promise<Movie[]> => {
  let dynamicUrl = ""
  switch (tvSeriesListCategory) {
    case "Airing Today":
      dynamicUrl = "airing_today"
      break;
    case "On the Air":
      dynamicUrl = "on_the_air"
      break;
    case "Popular":
      dynamicUrl = "popular"
      break;
    case "Top Rated":
      dynamicUrl = "top_rated"
      break;

  }
  const tvSeriesListUrl = `${BASE_URL}/tv/${dynamicUrl}?api_key=${API_KEY}`
  const tvSeriesListResponse = await axios.get(tvSeriesListUrl)
  return tvSeriesListResponse.data.results

}

export const searchTvSeries = async (searchString: string): Promise<Movie[]> => {
  const searchUrl = `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${searchString}`
  const tvSeriesListResponse = await axios.get(searchUrl)
  return tvSeriesListResponse.data.results

}