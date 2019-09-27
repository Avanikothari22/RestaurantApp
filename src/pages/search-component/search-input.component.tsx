import React, { ReactNode } from 'react';
import './search-component.css';
import { observer } from 'mobx-react';
import { ApiService } from '../../services/http-api.service';
import { IRestaurant, } from '../../IAppInterfaces';
import { Cuisine, Category, Establishment, IAppliedFilters } from '../../services/IHttpApiService';
import RestaurantCell from '../restaurant-cell/restaurant-cell.component';
import Apploader from '../../loader-components/spinner.component';

import { Link } from 'react-router-dom'
import { AppStore } from '../../store/app.store';
class SearchInput extends React.Component<{}, { restaurantList: IRestaurant[], resultsFound: string, keyword: string, operation: string, lat: number, lng: number, cuisineList: (Establishment | Cuisine | Category)[], categoryList: (Establishment | Cuisine | Category)[], establishmentList: (Establishment | Cuisine | Category)[], appliedFilters: IAppliedFilters}>{
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            keyword: '',
            operation: 'Search',
            restaurantList: [],
            cuisineList: [],
            categoryList: [],
            establishmentList: [],
            resultsFound: '',
            appliedFilters:{
                cuisines: [],
                establishment_type: [],
                category: [],
                sort: []
            },
            lat: 0,
            lng: 0,
        }

    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(async position => {
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.latitude,
            }, () => {
                this.fetchCuisines();
                this.fetchCategories();
                this.fetchEstablishmts()

            })
        });
    }

    public onChange(e: any): void {
        this.setState({ keyword: e.target.value });
    }

    public search() {
        this.fetchRestaurants();

    }
    private async fetchCuisines() {
        let apiServObj: ApiService = new ApiService();
        const cuisines: Cuisine[] = await apiServObj.getCuisinesList(this.state.lat, this.state.lng);
        AppStore.filters.setCuisines(cuisines);
        this.setState({
            cuisineList: cuisines.slice(0, 9)
        })
    }
    private async fetchCategories() {
        let apiServObj: ApiService = new ApiService();
        const categories: Category[] = await apiServObj.getCategoryList();
        AppStore.filters.setCategory(categories);
        this.setState({
            categoryList: categories.slice(0, 9)
        })
    }
    private async fetchEstablishmts() {
        let apiServObj: ApiService = new ApiService();
        const establishments: Establishment[] = await apiServObj.getEstablishments();
        AppStore.filters.setEstablishmentTypes(establishments);
         this.setState({
            establishmentList: establishments.slice(0, 9)
        })
    }

    private async fetchRestaurants() {
        this.setState({ operation: 'fetching restaurants...' })
        AppStore.loader.toggleLoader(true);
        let apiServObj: ApiService = new ApiService();
        const restaurants: IRestaurant[] = await apiServObj.getRestaurantList(this.state.keyword, 10, this.state.lat, this.state.lng);
        AppStore.loader.toggleLoader(false);
        this.setState({
            operation: 'search',
            restaurantList: restaurants,
            resultsFound: restaurants.length === 0 ? 'No Results Found.' : ''
        });
    }
    private getnewFilterObj(type: string, obj: any) {
        switch (type) {
            case 'establishment':
                return {
                    establishment: {
                        ...obj.establishment,
                        hovered: !obj.establishment.hovered,
                    }
                }
            case 'category':
                return {
                    categories: {
                        ...obj.categories,
                        hovered: !obj.categories.hovered,
                    }
                }
            case 'cuisine':
                return {
                    cuisine: {
                        ...obj.cuisine,
                        hovered: !obj.cuisine.hovered,
                    }
                }
            default:
                return obj;
        }
    }
    onHover(id: number, arr: (Establishment | Cuisine | Category)[], filterType: string) {
        let obj: (Establishment | Cuisine | Category) = arr[id];
        let fArr = arr;
        const newObj = this.getnewFilterObj(filterType, obj);
        fArr[id] = newObj;
        switch (filterType) {
            case 'establishment':
                this.setState({
                    establishmentList: fArr
                })
                break;
            case 'category':
                this.setState({
                    categoryList: fArr
                })
                break;
            case 'cuisine':
                this.setState({
                    cuisineList: fArr
                })
                break;
            default:
                this.setState({
                    establishmentList: fArr
                })
                break;
        }

    }

    private onfilterSelect() {

    }

    renderFilters(title: string, filtersArray: (Establishment | Cuisine | Category)[], filterName: string, filterType: string): ReactNode {
        return (
            <div>
                <text style={{ color: '#3d3d3d', fontSize: 16, textAlign: 'left', fontWeight: 'bold' }}>{title}:</text>
                {filtersArray.map((obj: any, id: number) => {
                    return (
                        <div style={{ textAlign: 'left' }}>
                            <div onMouseEnter={() => this.onHover(id, filtersArray, filterType)} onMouseLeave={() => this.onHover(id, filtersArray, filterType)} style={{ color: obj[title]['hovered'] ? 'green' : 'black' }} onClick={() => this.onfilterSelect()}>{obj[title][filterName]}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
    renderSortByFilters() {
        return (
            <div style={{ textAlign: 'left' }}>
                <text style={{ fontWeight: 800 }}>Sort By</text><br />
                <text>Cost</text><br />
                <text>Rating</text><br />
                <text>New Distance</text><br />
            </div>
        )
    }

    render(): ReactNode {
        return (
            <div style={{ textAlign: 'center', paddingTop: 30, backgroundColor: '#ededed' }} >
                <input className='Search-Input' style={{ width: 500, height: 30, marginRight: 10, borderRadius: 5 }} type='text' placeholder={'Search by cuisine or restaurant'} value={this.state.keyword} onChange={(e) => this.onChange(e)} />
                <input className='Search-Button' style={{ borderRadius: 5, height: 30, }} type='button' value={this.state.operation} onClick={() => this.search()} />
                <div className='MainContainer'>
                    <Apploader showLoader={AppStore.loader.showLoader} />
                    {this.state.restaurantList.length > 0 ?
                        <div className='MainContainer'>
                            <div className='Filters'>
                                <text style={{ fontWeight: 800, textAlign: 'left' }}>Filters:</text><br />
                                {this.renderFilters('cuisine', this.state.cuisineList, 'cuisine_name', 'cuisine')}
                                {this.renderFilters('categories', this.state.categoryList, 'name', 'category')}
                                {this.renderFilters('establishment', this.state.establishmentList, 'name', 'establishment')}
                                {this.renderSortByFilters()}
                            </div>
                            <div className='Restaurants'>
                                {this.state.restaurantList.map((obj: any) => {
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
                                })}
                            </div>
                        </div> : this.state.resultsFound
                    }
                </div>
            </div>
        );
    }
}
export default observer(SearchInput)