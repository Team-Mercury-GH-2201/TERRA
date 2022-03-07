import React from 'react';

class GuestCart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }
  componentDidMount() {
    let cart = window.localStorage.getItem('cart');
    // if (!cart) {
    //   cart = window.localStorage.setItem(
    //     'cart', JSON.stringify({ plants: [] })
    //   );
      let parsedCart = JSON.parse(cart);
      this.setState({
        cart: parsedCart,
      });
    }
  render() {
    return (
      <div>
        <h4>Hello</h4>
        <ul>
          {this.state.cart.map((plant, idx) => (
            <li key={idx}>{plant.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default GuestCart;