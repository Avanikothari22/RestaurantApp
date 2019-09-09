import { AppConstants } from '../../common/app-constants';
import { IRestaurantResponse } from '../IHttpApiService';
const data = require('../../../__mock_data__/restaurant.json');
export default class HttpBaseService {
 
  public static async getApi(endpoint: string): Promise<IRestaurantResponse> {
    console.log('=====', data);
    return Promise.resolve(data)
  }

}