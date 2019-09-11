import React, { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RestaurantProps } from './IRestaurantProps';
import './restaurant.css';

/**
 * @export
 * @class RestaurantCell
 * @extends Component
 * @description 
 */
 
export default class Restaurant extends React.Component<RouteComponentProps, {}>{
    constructor(props: Readonly<RouteComponentProps>){
        super(props)
      }
    public async componentDidMount(){
      console.log('res====', this.props.location.state);
    }
    render(): ReactNode {
        return <div>
           <h2>ashgoasho</h2>
        </div>
    }
}
