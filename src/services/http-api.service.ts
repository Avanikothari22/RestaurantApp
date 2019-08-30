import {IRestaurants} from '../IAppInterfaces';
import {HttpBaseService} from './http-base.service';
export class ApiService{
    public static async getRestaurantList(endpoint: string): Promise<IRestaurants[]>{
            const restaurantResponse = await HttpBaseService.getApi(endpoint);
            const restaurantsArray: IRestaurants[]= restaurantResponse.restaurants;
            return restaurantsArray;
    }
}