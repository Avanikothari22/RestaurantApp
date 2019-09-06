import React, { ReactNode } from 'react';
import { ClipLoader, SyncLoader } from 'react-spinners';
import { css } from '@emotion/core';
const override = css`
    display: block;
    margin: 0 auto;
`;
export default class Apploader extends React.Component<{showLoader: boolean}, {}> {
    render(): ReactNode{
        return(
            <div className='sweet-loading'>
        <SyncLoader
          css={override}
          sizeUnit={"px"}
          color={'#5a8ca6'}
          loading={this.props.showLoader}
        />
      </div> 
        )
    }
}