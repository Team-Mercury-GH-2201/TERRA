import React from 'react';
import { connect } from 'react-redux';

export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
    };
  }
  render() {
    return <h4>This is the cart</h4>;
  }
}

