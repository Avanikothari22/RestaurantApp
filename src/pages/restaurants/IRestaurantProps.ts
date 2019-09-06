import { RouteComponentProps } from 'react-router-dom';
export interface IResProps{
    id: string; 
    thumb: string;
    name: string; 
    cuisines: string; 
    cost: string;
    timings: string;
    call: string;
}
export type RestaurantProps = RouteComponentProps | IResProps;