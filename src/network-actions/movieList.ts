import { API_KEY, BASE_URL } from "../constants";
import axios from "axios"

export const getMovieList = async (movieListCategory: string): Promise<Movie[]> => {
  let dynamicUrl = ""
  switch (movieListCategory) {
    case "Now Playing":
      dynamicUrl = "now_playing"
      break;
    case "Popular":
      dynamicUrl = "popular"
      break;
    case "Top Rating":
      dynamicUrl = "top_rated"
      break;
    case "Upcoming":
      dynamicUrl = "upcoming"
      break;

  }
  const movieListUrl = `${BASE_URL}/movie/${dynamicUrl}?api_key=${API_KEY}`
  const movieListResponse = await axios.get(movieListUrl)
  return movieListResponse.data.results

}