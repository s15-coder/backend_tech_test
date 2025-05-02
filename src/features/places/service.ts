import LatLng from "../../types/model/lat-lng";
import PlacesRepository from "./repository";

export default class PlacesService {
    constructor(private placesRepository: PlacesRepository) {
    }
    public getNearbyRestaurants = async (longitude: string, latitude: string) => {
        const coordinates: LatLng = {
            lat: parseFloat(latitude as string),
            lng: parseFloat(longitude as string),
        };
        return this.placesRepository.getPlacesSuggestions('restaurant', coordinates);
    }

}