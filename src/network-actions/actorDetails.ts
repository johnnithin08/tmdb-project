import axios from "axios"
import { API_KEY, BASE_URL } from "../constants"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const getActorDetails = async (id: number): Promise<IActor> => {
    const actorDetailsUrl = `${BASE_URL}/person/${id}?api_key=${API_KEY}`
    const actorDetailsResponse = await axios.get(actorDetailsUrl)
    return actorDetailsResponse.data
}