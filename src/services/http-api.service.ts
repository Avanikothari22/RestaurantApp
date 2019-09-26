import { IRestaurant } from '../IAppInterfaces';
import HttpBaseService from './http-base.service';
import { Category, Cuisine, Establishment } from './IHttpApiService';
import { END_POINTS } from '../common/app-constants';
export class ApiService {

    public async getRestaurantList(keyword: string, count: number, latitude: number, longitude: number): Promise<IRestaurant[]> {
        const restaurantResponse = await HttpBaseService.getApi(`${END_POINTS.search}q=${keyword}&count=${count}&lat=${latitude}&lon=${longitude}`);
        const restaurantsArray: IRestaurant[] = restaurantResponse.restaurants;
        return restaurantsArray;
    }

    public async getCuisinesList(latitute: number, longitude: number): Promise<Cuisine[]> {
        const cuisineResponse = await HttpBaseService.getApi(`${END_POINTS.cuisines}city_id=5&lat=${latitute}&lon=${longitude}`);
        const cuisinesArray: Cuisine[] = cuisineResponse.cuisines;
        const arr = cuisinesArray.map(obj=>{
            return{
               cuisine: {
                ...obj.cuisine,
                hovered: false
                }
            }
        })
      //  console.log('cuisine=======', arr)
        return arr;
    }
    public async getCategoryList(): Promise<Category[]>{
        const categoryResponse = await HttpBaseService.getApi(`${END_POINTS.category}`);
        const categoriesArray: Category[] = categoryResponse.categories;
        const arr = categoriesArray.map(obj=>{
            return{
               categories: {
                ...obj.categories,
                hovered: false
                }
            }
        })
      //  console.log('categories=======', arr)
        return arr;
    }
    public async getEstablishments(): Promise<Establishment[]>{
        const establishmetResponse = await HttpBaseService.getApi(`${END_POINTS.establishments}city_id=5`);
        const establishmentArray: Establishment[] = establishmetResponse.establishments;
        const arr = establishmentArray.map(obj=>{
            return{
               establishment: {
                ...obj.establishment,
                hovered: false
                }
            }
        })
       // console.log('establishmrnt=======', arr)
        return arr;
    }
}