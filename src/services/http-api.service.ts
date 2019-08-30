import {IRestaurant} from '../IAppInterfaces';
import {HttpBaseService} from './http-base.service';
export class ApiService{
    public static async getRestaurantList(endpoint: string): Promise<IRestaurant[]>{
            const restaurantResponse = await HttpBaseService.getApi(endpoint);
            const restaurantsArray: IRestaurant[]= restaurantResponse.restaurants;
            return restaurantsArray;
    }
}