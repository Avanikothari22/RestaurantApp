import { IRestaurant } from '../IAppInterfaces';
import HttpBaseService from './http-base.service';
import { Category, Cuisine, Establishment, IAppliedFilters } from './IHttpApiService';
import { END_POINTS } from '../common/app-constants';
import { AppStore } from '../store/app.store';
export class ApiService {

    public async getRestaurantList(keyword: string, count: number, latitude: number, longitude: number): Promise<IRestaurant[]> {
        let url;
        if (AppStore.filters.filterApplied)
            url = this.getFilteredUrl(AppStore.filters.appliedFilters, keyword, count, latitude, longitude);
        else
            url = `${END_POINTS.search}q=${keyword}&count=${count}&lat=${latitude}&lon=${longitude}`;

        const restaurantResponse = await HttpBaseService.getApi(url);
        const restaurantsArray: IRestaurant[] = restaurantResponse.restaurants;
        console.log('restaurants======', restaurantsArray);
        return restaurantsArray;
    }

    public async getCuisinesList(latitute: number, longitude: number): Promise<Cuisine[]> {
        const cuisineResponse = await HttpBaseService.getApi(`${END_POINTS.cuisines}city_id=5&lat=${latitute}&lon=${longitude}`);
        const cuisinesArray: Cuisine[] = cuisineResponse.cuisines;
        const arr = cuisinesArray.map(obj => {
            return {
                cuisine: {
                    ...obj.cuisine,
                    pressed: false,
                    hovered: false
                }
            }
        })
        //  console.log('cuisine=======', arr)
        return arr;
    }
    public async getCategoryList(): Promise<Category[]> {
        const categoryResponse = await HttpBaseService.getApi(`${END_POINTS.category}`);
        const categoriesArray: Category[] = categoryResponse.categories;
        const arr = categoriesArray.map(obj => {
            return {
                categories: {
                    ...obj.categories,
                    pressed: false,
                    hovered: false
                }
            }
        })
        //  console.log('categories=======', arr)
        return arr;
    }
    public async getEstablishments(): Promise<Establishment[]> {
        const establishmetResponse = await HttpBaseService.getApi(`${END_POINTS.establishments}city_id=5`);
        const establishmentArray: Establishment[] = establishmetResponse.establishments;
        const arr = establishmentArray.map(obj => {
            return {
                establishment: {
                    ...obj.establishment,
                    pressed: false,
                    hovered: false
                }
            }
        })
        // console.log('establishmrnt=======', arr)
        return arr;
    }
    private getFilteredUrl(appliedFilters: any, keyword: string, count: number, lat: number, lng: number): string {
        let url = `${END_POINTS.search}q=${keyword}&count=${count}&lat=${lat}&lon=${lng}`
        let categoriesId = '';
        let establishmentId = '';
        let cuisineId = '';
        if (appliedFilters.cuisines.length > 0) {
            appliedFilters.cuisines.map((item: string, index: number) => {
                if(index=== 0)
                    cuisineId = item;
                else
                    cuisineId = cuisineId + '%2C' + item;
            });
            url = `${url}&cuisines=${cuisineId}`
        }
        if (appliedFilters.establishment_type.length > 0) {
            appliedFilters.establishment_type.map((item: string, index: number) => {
                if(index=== 0)
                    establishmentId = item
                else
                establishmentId = establishmentId + '%2C' + item;

            })
            url = `${url}&establishment_type=${establishmentId}`

        }
        if (appliedFilters.category.length > 0) {
            appliedFilters.category.map((item: string, index: number) => {
                if(index=== 0)
                    categoriesId = item
                else
                    categoriesId = categoriesId + '%2C' + item;
            });
            url = `${url}&category=${categoriesId}`
        }
        if(appliedFilters.sort.length > 0){
            url = `${url}&sort=${appliedFilters.sort}`
        }
        return url;
    }
}