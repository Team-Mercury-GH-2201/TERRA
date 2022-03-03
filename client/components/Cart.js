import React from 'react';
import { connect } from 'react-redux';
import { getCart } from '../store/cart';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
    };
  }
  componentDidMount() {
    let userId = this.props.auth;
    this.props.getCart(userId);
  }
  render() {
    const cart = this.props.cart;
    console.log(this.props);
    if (!cart.plants) {
      return <h3>loading your cart...</h3>;
    }
    return (
      <div>
        {cart.plants.map((plant) => {
          return <div key={plant.id}>Name: {plant.name}</div>;
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return { cart: state.cart, auth: state.auth.id };
};

const mapDispatch = (dispatch) => {
  return {
    getCart: (userId) => dispatch(getCart(userId)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
