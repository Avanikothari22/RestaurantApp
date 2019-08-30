import React, { Component, ReactNode } from 'react';

import './restaurant-cell.css';
/**
 * @export
 * @class RestaurantCell
 * @extends Component
 * @description 
 */
export default class RestaurantCell extends React.Component<{ thumbImage: string, name: string, cuisines: string, cost: number, timings: string, phoneNumber: string }, {}>{


    render(): ReactNode {
        return <div>
            <div>
                <img src={this.props.thumbImage} />
            </div>
            <div>
                <h3>{this.props.name}</h3>
                <b>Cuisines: </b>{this.props.cuisines}<br />
                <b>Cost for two: </b>{this.props.cost}<br />
                <b>Timings: </b>{this.props.timings}<br />
                <b>Call: </b>{this.props.phoneNumber}<br />
            </div>
        </div>
    }
}
