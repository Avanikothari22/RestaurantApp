import {IRestaurant} from '../IAppInterfaces';
import {HttpBaseService} from './http-base.service';
export class ApiService{
    public static async getRestaurantList(endpoint: string): Promise<IRestaurant[]>{
            const restaurantResponse = await HttpBaseService.getApi(endpoint);
            const restaurantsArray: IRestaurant[]= restaurantResponse.restaurants;
            return restaurantsArray;
    }
    // public static async getRestaurant(id: number): Promise<IRestaurant>{
    //     const endpoint = `restaurant?res_id=${id}`;
    //     const restaurantResponse : IRestaurant = await HttpBaseService.getApi(endpoint);
    //     return restaurantResponse;
    // }
}