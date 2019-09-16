import React, { ReactNode } from 'react';
import './home.css';
import { observer } from 'mobx-react';
import { ApiService } from '../../services/http-api.service';
import { IRestaurant } from '../../IAppInterfaces';
import RestaurantCell from '../restaurant-list/restaurant-cell.component';
import Apploader from '../../loader-components/spinner.component';
import Background from '../../assets/images/home/foodie.jpg';
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
            <div >
        <div 
            style = {{ backgroundImage: `url(${Background})`, 
                backgroundSize: 'cover', 
                height: window.innerHeight/2.5,
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                alignItems:'center',
              }}>
                <h2 className='Search-Heading'>Search Near By Restaurants</h2>
                <input className='Search-Input' type='text' placeholder={'Search by cuisine or restaurant'} value={this.state.keyword} onChange={(e) => this.onChange(e)} />
                <input className='Search-Button' style={{borderRadius:5}} type='button' value={this.state.operation} onClick={() => this.search()} />
            </div>
                 <div className='MainContainer'>
                <Apploader showLoader={AppStore.loader.showLoader}/>
                    {this.state.restaurantList.length > 0 ?
                        this.state.restaurantList.map((obj: any) => {
                            const restObj = obj.restaurant;
                        //    console.log('restObj=====',restObj);
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
 export default observer(SearchInput)