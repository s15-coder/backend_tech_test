import LatLng from "../../types/model/lat-lng";
import PlacesRepository from "./repository";

export default class PlacesService {
    constructor(private placesRepository: PlacesRepository) {
    }
    public getNearbyRestaurants = async (coordinates: LatLng) => {
        return this.placesRepository.getPlacesSuggestions('restaurant', coordinates);
    }

}