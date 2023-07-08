import axios from "axios"
import { BASE_URL, API_KEY } from "../constants"

export const getSeasonDetails = async (id: number, seasonNumber: number): Promise<ISeasonData> => {
    const seasonDetailsUrl = `${BASE_URL}/tv/${id}/season/${seasonNumber}?api_key=${API_KEY}`
    const seasonDetailsResponse = await axios.get(seasonDetailsUrl)
    return seasonDetailsResponse.data
}
