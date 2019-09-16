import React, { ReactNode } from 'react';
import './home.css';
import { ApiService } from '../../services/http-api.service';
import { IRestaurant } from '../../IAppInterfaces';
import RestaurantCell from '../restaurant-list/restaurant-cell.component';
import Apploader from '../../loader-components/spinner.component';
import Background from '../../assets/images/home/foodie.jpg';
import {BrowserRouter as Router, Link, Route, RouteComponentProps, Redirect } from 'react-router-dom'
import Restaurant from '../restaurants/restaurant.component';
export default class SearchInput extends React.Component<{}, { showLoader: boolean, restaurantList: IRestaurant[], resultsFound: string, keyword: string, operation: string, lat: number, lng: number }>{
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            showLoader: false,
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
        this.setState({ operation: 'fetching restaurants...', showLoader: true })
        const url = `search?q=${this.state.keyword}&count=10&lat=${this.state.lat}&lon=${this.state.lng}`;
        let apiServObj: ApiService = new ApiService();
        const restaurants: IRestaurant[] = await apiServObj.getRestaurantList(url);
        this.setState({
            operation: 'search',
            restaurantList: restaurants,
            showLoader: false,
            resultsFound: restaurants.length === 0 ? 'No Results Found.' : ''
        });
    }
    render(): ReactNode {
        return (
            <div >
        <div 
            style = {{ backgroundImage: `url(${Background})`, 
                backgroundSize: 'cover', 
                height: window.innerHeight/2,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                paddingTop: 60,
              }}>
                
                <h3 className='Search-Heading'>Search Near By Restaurants</h3>
                <h5 className='Mid-Heading'>Find the best restaurants, cafés, and bars in your city</h5>
                <input className='Search-Input' style={{width:500, height: 30, marginRight:10, borderRadius:5}} type='text' placeholder={'Search by cuisine or restaurant'} value={this.state.keyword} onChange={(e) => this.onChange(e)} />
                <input className='Search-Button' style={{borderRadius:5, height: 30,}} type='button' value={this.state.operation} onClick={() => this.search()} />
                </div>
          
                 <div className='MainContainer'>
                <Apploader showLoader={this.state.showLoader}/>
                    {this.state.restaurantList.length > 0 ?
                        this.state.restaurantList.map((obj: any) => {
                            const restObj = obj.restaurant;
                            const { id, thumb, name, cuisines, average_cost_for_two, timings, phone_numbers } = restObj;
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
