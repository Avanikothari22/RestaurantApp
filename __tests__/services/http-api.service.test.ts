
import {ApiService} from '../../src/services/http-api.service';

import getApi from '../../__mocks__/http-api.service';
jest.mock('../../src/services/http-base.service');
//let apiServObj: ApiService;
beforeEach(() => {
    //apiServObj = new ApiService();
   // getApi.mockClear();
  });



  
  it('should return a json data', async ()=> {
    const apiServObj = new ApiService();
    const response =  await apiServObj.getRestaurantList('')
    
    console.log('-----', response)
    expect(response).toBeDefined();
  });





 // let apiServObj: ApiService'
// beforeAll( () => {
//     apiServObj = new ApiService();
// });


// describe('Test All the methods in http-api.service',  () => {
//     test('test Meta data function call', async () => {
//         const spy = jest.spyOn(apiServObj,'');
//         spy.mockImplementation( (): Promise<any> => Promise.resolve(request('getMetaData')));
//         const response =  await apiServObj.getRestaurantList('');
//         expect(response).toBeDefined();
//         spy.mockReset();
//     });
// )