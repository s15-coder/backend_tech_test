import { Request, Response } from "express";
import PlacesService from "./service";
import LatLng from "../../types/model/lat-lng";

export default class PlacesController {
    constructor(private placesService: PlacesService) {
    }
    public getNearbyRestaurants = async (req: Request, res: Response): Promise<any> => {
        const { latitude, longitude } = req.query;

        try {
            const restaurants = await this.placesService.getNearbyRestaurants(longitude as string, latitude as string);
            return res.status(200).json(restaurants);
        } catch (error) {
            console.error('Error fetching nearby restaurants:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}