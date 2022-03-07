import React from 'react';
import Navbar from './Navbar';

export class Checkout extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <div className='checkout'></div>
          <h3>You're plant friends order has been placed.  Thanks for shopping with Terra!</h3>
      </div>
    );
  }
}


