import { AppConstants } from '../common/app-constants';
import { IResponse } from './IHttpApiService';
import { ApiOperations } from './http-api.operation';
export class HttpBaseService {
  private static APP_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'user-key': AppConstants.API_KEY
  }

  public static async getApi(endpoint: string): Promise<IResponse> {
    return new Promise(resolve => {
      fetch(`${AppConstants.BASE_URL}/${endpoint}`, {
        method: AppConstants.HTTP_REQUEST_TYPES.GET_REQUEST,
        headers: this.getHeaders()
      })
        .then(async (response: Response) => {
          if (
            response.status === AppConstants.API_RESPONSE_CODES.UNAUTHORIZED
          ) {
            return response;
          } else {
            const parsedResponse = await ApiOperations.parseAPIResponse(response)
            console.log('******response**********', parsedResponse);
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