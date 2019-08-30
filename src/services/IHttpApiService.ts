import { string } from "prop-types";
export interface ILocation {
    address: string;
    locality: string;
    city: string;
    latitude: string;
    longitude: string;
    zipcode: string;
    country_id: string;
}

export interface IUserRating {
    aggregate_rating: string;
    rating_text: string;
    rating_color: string;
    votes: string;
}

export interface IUser {
    name: string;
    zomato_handle: string;
    foodie_level: string;
    foodie_level_num: string;
    foodie_color: string;
    profile_url: string;
    profile_deeplink: string;
    profile_image: string;
}

export interface IPhoto {
    id: string;
    url: string;
    thumb_url: string;
    user: IUser;
    res_id: string;
    caption: string;
    timestamp: string;
    friendly_time: string;
    width: string;
    height: string;
    comments_count: string;
    likes_count: string;
}

export interface IUser2 {
    name: string;
    zomato_handle: string;
    foodie_level: string;
    foodie_level_num: string;
    foodie_color: string;
    profile_url: string;
    profile_deeplink: string;
    profile_image: string;
}

export interface IAllReview {
    rating: string;
    review_text: string;
    id: string;
    rating_color: string;
    review_time_friendly: string;
    rating_text: string;
    timestamp: string;
    likes: string;
    user: IUser2;
    comments_count: string;
}

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

export interface IResponse {
    results_found: string;
    results_start: string;
    results_shown: string;
    restaurants: IRestaurant[];
}

export interface IAppHeaders {
    Accept: string;
    Content_Type: string;
    user_key: string;

}



