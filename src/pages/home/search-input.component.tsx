import React, { ReactNode } from 'react';
import './home.css';
import { ApiService } from '../../services/http-api.service';
import { IRestaurants } from '../../IAppInterfaces';
import RestaurantCell from '../restaurant-list/restaurant-cell.component';
export default class SearchInput extends React.Component<{}, { restaurantList: IRestaurants[], keyword: string, operation: string, lat: number, lng: number }>{
    constructor(props: any) {
        super(props);
        this.state = {
            keyword: '',
            operation: 'Search',
            restaurantList: [],
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

    public async fetchRestaurants() {
        this.setState({ operation: 'fetching restaurants...' })
        const url = `search?q=${this.state.keyword}&count=10&lat=${this.state.lat}&lon=${this.state.lng}`;
        const restaurants: IRestaurants[] = await ApiService.getRestaurantList(url);
        this.setState({
            operation: 'search',
            restaurantList: restaurants
        });
    }

    render(): ReactNode {
        return (
            <div className='Container'>
                <h2 className='Search-Heading'>Search Near By Restaurants</h2>
                <input className='Search-Input' type='text' placeholder={'Search by cuisine or restaurant'} value={this.state.keyword} onChange={(e) => this.onChange(e)} />
                <input className='Search-Button' type='button' value={this.state.operation} onClick={() => this.search()} />
                <div>
                    {this.state.restaurantList.length > 0 ?
                        this.state.restaurantList.map((obj: any, index: number) => {
                            const restObj: { thumb: string, name: string, cuisines: string, average_cost_for_two: number, timings: string, phone_numbers: string } = obj.restaurant;
                            const { thumb, name, cuisines, average_cost_for_two, timings, phone_numbers } = restObj;
                            return (
                                <div>
                                    <RestaurantCell thumbImage={thumb} name={name} cuisines={cuisines} cost={average_cost_for_two} timings={timings} phoneNumber={phone_numbers} />
                                </div>
                            )
                        }) : null
                    }
                </div>
            </div>
        );
    }
}
