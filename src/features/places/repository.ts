import axios from 'axios';
import LatLng from '../../types/model/lat-lng';

export default class PlacesRepository {
    private readonly mapBoxUrl: string = 'https://api.mapbox.com/search/searchbox/v1/category';


    constructor() {
    }

    /**
     * Fetches place suggestions based on the provided point of interest (POI) and optional proximity or city.
     * @param poi The point of interest to search for.
     * @param proximity Optional proximity coordinates (latitude and longitude).
     * @param city Optional city name to narrow down the search.
     * @returns A promise that resolves to an array of place suggestions.
     */
    public async getPlacesSuggestions(poi: string, proximity: LatLng,): Promise<any[]> {

        const url = `${this.mapBoxUrl}/${encodeURIComponent(poi)}`;

        const queryParameters: Record<string, string> = {
            access_token: process.env.MAPBOX_ACCESS_TOKEN as string,
            session_token: process.env.MAPBOX_SESSION_TOKEN as string,
            proximity: `${proximity.lng},${proximity.lat}`,
        };

        const response = await axios.get(url, { params: queryParameters });
        const placesResponse = response.data;
        return placesResponse.features || [];
    }


}
