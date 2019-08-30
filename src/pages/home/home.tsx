import React, { ReactNode } from 'react';
import './home.css';
import SearchInput from './search-input.component';
export default class Home extends React.Component<{}, {}>{

  render(): ReactNode {
    return (
      <div className='.Container'>
        <SearchInput />
      </div >
    );
  }
}
