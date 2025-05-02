import axios from 'axios';
import LatLng from '../../types/model/lat-lng';

export default class PlacesRepository {
    private readonly mapBoxUrl: string = 'https://api.mapbox.com/search/searchbox/v1/category';

    public async getPlacesSuggestions(poi: string, proximity: LatLng,): Promise<any[]> {

        const url = `${this.mapBoxUrl}/${encodeURIComponent(poi)}`;

        const queryParameters: Record<string, string> = {
            access_token: process.env.MAPBOX_ACCESS_TOKEN as string,
            proximity: `${proximity.lng},${proximity.lat}`,
        };

        const response = await axios.get(url, { params: queryParameters });
        const placesResponse = response.data;
        return placesResponse.features || [];
    }


}
