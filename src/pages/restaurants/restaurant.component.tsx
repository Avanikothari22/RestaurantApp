import React, { ReactNode, } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IRestaurantDetails } from './IRestaurantProps';
import './restaurant.css';

/**
 * @export
 * @class Restaurant
 * @extends Component
 * @description 
 */

export default class Restaurant extends React.Component<IRestaurantDetails, {}>{
    constructor(props: Readonly<IRestaurantDetails>) {
        super(props);
    }
    render(): ReactNode {
        const resState: IRestaurantDetails = this.props.history.location.state;
        return <div style={{paddingLeft:300, paddingRight:100}}>
            <img src={resState.thumb} style={{ width: 600, height: 300 }} />
            <h2 style={headingStyle}>{resState.name}</h2>
            <div style={{alignItems:'space-between'}}>
                <b>Phone Number: </b>{resState.phone_numbers}
                <b> opening hours: </b>{resState.timings}
                <b> More Info: </b>{resState.highlights[0]}
                <b></b>{resState.highlights[1]},
                <b></b> {resState.highlights[2]},
                <b></b> {resState.highlights[3]},
                </div><br/>
                <div style={{justifyContent:'space-between'}}>
                <b> Cuisines: </b>{resState.cuisines}
                <b> User Rating: </b>{resState.user_rating.aggregate_rating}
                <b> views: </b>{resState.user_rating.rating_text}
                <b> Menu: </b> <img src={resState.menu_url} /><br/>
                </div><br/>
                <b> Cost for two: </b>{resState.average_cost_for_two}
       
         </div>
    }
}
const containerDivStyle= {
    paddingHorizontal: 100,
}
const headingStyle = {
    alignSelf: 'flex-start'
}
const rowStyle: React.CSSProperties = {
    flexDirection: 'row',
} 
const div1Style: React.CSSProperties={
    flexDirection:'column'
}
