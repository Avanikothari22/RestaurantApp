import { IRestaurantResponse, IRestaurant, IResponse } from './IHttpApiService';
export class ApiOperations {
  public static async parseAPIResponse(response: Response): Promise<IResponse> {
    const res = await response.json();
    return res;
    //TODO: handle error 
    //   throw ApiOperations.handleErrorMessage(response);
  }
}