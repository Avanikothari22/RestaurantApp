import {IRestaurant} from '../IAppInterfaces';
import HttpBaseService from './http-base.service';
import {ILocation} from './IHttpApiService';
export class ApiService{
    public  async getRestaurantList(endpoint: string): Promise<IRestaurant[]>{
            const restaurantResponse = await HttpBaseService.getApi(endpoint);
            const restaurantsArray: IRestaurant[]= restaurantResponse.restaurants;
            // let finalArr = restaurantsArray.map((obj:IRestaurant)=>{
            //     return {
            //         ...obj,
            //         address: obj.location.address
            //     }
            // })
            // console.log('final array =====',finalArr[0]);
            return restaurantsArray;
    }
    // public static async getRestaurant(id: number): Promise<IRestaurant>{
    //     const endpoint = `restaurant?res_id=${id}`;
    //     const restaurantResponse : IRestaurant = await HttpBaseService.getApi(endpoint);
    //     return restaurantResponse;
    // }
}