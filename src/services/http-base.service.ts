import { BASE_URL, HTTP_REQUEST_TYPES, API_RESPONSE_CODES, API_KEY } from '../common/app-constants';
import { IRestaurantResponse, IResponse } from './IHttpApiService';
import { ApiOperations } from './http-api.operation';
export default class HttpBaseService {
  private static APP_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'user-key': API_KEY
  }

  public static async getApi(endpoint: string): Promise<IResponse> {
    return new Promise(resolve => {
      fetch(`${BASE_URL}/${endpoint}`, {
        method: HTTP_REQUEST_TYPES.GET_REQUEST,
        headers: this.getHeaders()
      })
        .then(async (response: Response) => {
          if (
            response.status === API_RESPONSE_CODES.UNAUTHORIZED
          ) {
            return response;
          } else {
            const parsedResponse = await ApiOperations.parseAPIResponse(response)
           // console.log('******response**********',JSON.stringify(parsedResponse));
            resolve(parsedResponse);
          }
        })
        .catch((error) => {
          console.log('error=====', error);
        });
    })
  }

  private static getHeaders() {
    return HttpBaseService.APP_HEADERS;
  }
}