import React, { ReactNode } from 'react';
import './search-component.css';
import { observer } from 'mobx-react';
import { ApiService } from '../../services/http-api.service';
import { IRestaurant } from '../../IAppInterfaces';
import RestaurantCell from '../restaurant-cell/restaurant-cell.component';
import Apploader from '../../loader-components/spinner.component';

import { Link } from 'react-router-dom'
import { AppStore } from '../../store/app.store';
class SearchInput extends React.Component<{}, {  restaurantList: IRestaurant[], resultsFound: string, keyword: string, operation: string, lat: number, lng: number }>{
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
             keyword: '',
            operation: 'Search',
            restaurantList: [],
            resultsFound: '',
            lat: 0,
            lng: 0,
        }

    }

    public onChange(e: any): void {
        this.setState({ keyword: e.target.value });
    }

    public search() {
       navigator.geolocation.getCurrentPosition(async position => {
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.latitude,
            }, () => this.fetchRestaurants())
        });
    }

    private async fetchRestaurants() {
        this.setState({ operation: 'fetching restaurants...'})
        AppStore.loader.toggleLoader(true);
        const url = `search?q=${this.state.keyword}&count=10&lat=${this.state.lat}&lon=${this.state.lng}`;
        let apiServObj: ApiService = new ApiService();
        const restaurants: IRestaurant[] = await apiServObj.getRestaurantList(url);
        AppStore.loader.toggleLoader(false);
        this.setState({
            operation: 'search',
            restaurantList: restaurants,
            resultsFound: restaurants.length === 0 ? 'No Results Found.' : ''
        });
    }
    render(): ReactNode {
        return (
            <div style={{textAlign:'center', paddingTop: 30, backgroundColor: '#ededed' }} >
                <input className='Search-Input' style={{ width: 500, height: 30, marginRight: 10, borderRadius: 5 }} type='text' placeholder={'Search by cuisine or restaurant'} value={this.state.keyword} onChange={(e) => this.onChange(e)} />
          <input className='Search-Button' style={{ borderRadius: 5, height: 30, }} type='button' value={this.state.operation} onClick={() => this.search()} />
                <div className='MainContainer'>
                <Apploader showLoader={AppStore.loader.showLoader}/>
                    {this.state.restaurantList.length > 0 ?
                        this.state.restaurantList.map((obj: any) => {
                            const restObj = obj.restaurant;
                            const { thumb, name, cuisines, average_cost_for_two, timings, phone_numbers } = restObj;
                            return (
                               <div>
                                       <Link to={{
                                            pathname: '/restaurant',
                                            state: restObj
                                          }}>
                                        <RestaurantCell thumbImage={thumb} name={name} cuisines={cuisines} cost={average_cost_for_two} timings={timings} phoneNumber={phone_numbers} />
                                    </Link>
                            </div>
                            )
                        }) : this.state.resultsFound
                    }
                </div>
            </div>
        );
    }
}
 export default observer(SearchInput)