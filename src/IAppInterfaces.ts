import {ILocation} from './services/IHttpApiService';
import {IUserRating} from './services/IHttpApiService';
import {IPhoto} from './services/IHttpApiService';
import {IAllReview} from './services/IHttpApiService';

// restaurants interface
export interface IRestaurant {
    id: string;
    name: string;
    url: string;
    location: ILocation;
    average_cost_for_two: string;
    price_range: string;
    currency: string;
    thumb: string;
    featured_image: string;
    photos_url: string;
    menu_url: string;
    events_url: string;
    user_rating: IUserRating;
    has_online_delivery: string;
    is_delivering_now: string;
    has_table_booking: string;
    deeplink: string;
    cuisines: string;
    all_reviews_count: string;
    photo_count: string;
    phone_numbers: string;
    photos: IPhoto[];
    all_reviews: IAllReview[];
}
