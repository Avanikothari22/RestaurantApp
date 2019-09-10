
import {ApiService} from '../../../src/services/http-api.service';
import getApi from '../../../__mocks__/http-api.service';
jest.mock('../../../src/services/http-base.service.ts');
 let apiServObj: ApiService;
beforeEach(() => {
 apiServObj = new ApiService();
   getApi.mockClear();
  });

  it('should return an array of json data', async ()=> {
   const response =  await apiServObj.getRestaurantList('')
    console.log('-----', response)
    expect(response).toBeDefined();
  });