import React from 'react';

class GuestCart extends React.Component {
  constructor() {
    super();
    this.state = {
      plantToAddToCart: {},
      plants: [],
    };
  }
  componentDidMount() {
    let cart = window.localStorage.getItem('cart');
    console.log(cart)
    if (!cart) {
      cart = window.localStorage.setItem(
        'cart', JSON.stringify({ isComplete: false, plants: [] })
      );
    } else {
      let test = JSON.parse(cart);
      this.setState({
        plants: test.plants,
      });
    }
    console.log(cart);
  }
  render() {
    return (
      <div>
        <h4>Hello</h4>
      </div>
    );
  }
}

export default GuestCart;
