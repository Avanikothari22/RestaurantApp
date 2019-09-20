import React, { ReactNode } from 'react';
import './home.css';
import Background from '../../assets/images/home/foodie.jpg';
import { RouteComponentProps } from 'react-router-dom';
export default class Home extends React.Component<RouteComponentProps, {}>{
  
   private findButton =()=>{ 
    return(
    <button
      type='button'
      style={{background:'red', borderRadius:20, padding:10, color:'white', fontFamily:'Dancing Script', fontWeight:800}}
      onClick={() => {
        this.props.history.push('/search')
      }}
    >
      Find Out More
    </button>
       
     )
  }

  render(): ReactNode {
    return (
      <div className='.Container' style={{ textAlign: 'center' }}>
        <div
          style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: 'cover',
            height: window.innerHeight,
            fontFamily: 'Dancing Script',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            paddingTop: 50,
          }}>

          <h1 className='Search-Heading'>Search Near By Restaurants</h1>
          <h2 className='Mid-Heading'>Find the best restaurants, cafés, and bars in your city</h2>
          {this.findButton()}
        </div>
      </div >
    );
  }
}

