import Router from 'express';
import PlacesController from '../features/places/controller';
import PlacesService from '../features/places/service';
import PlacesRepository from '../features/places/repository';
import validateJwt from '../middlewares/validate-jwt';
import validateCoordinates from '../middlewares/places/validate-coordinates';

const router = Router()
const placesRepository = new PlacesRepository();
const placesService = new PlacesService(placesRepository);
const placesController = new PlacesController(placesService);

router.get(
    '/nearby-restaurants',
    validateCoordinates,
    placesController.getNearbyRestaurants,
);



export default router;

