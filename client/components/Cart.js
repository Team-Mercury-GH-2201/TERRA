import React from 'react';
import { connect } from 'react-redux';
import { getCart, removeFromCart, setQuantity, checkOut } from '../store/cart';
import Navbar from './Navbar';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    console.log('This is the user ID-->', this.props.auth.id);
    let userId = this.props.auth.id;
    this.props.getCart(userId);
  }
  handleChange(evt) {
    console.log('This is the plant ID-->', parseInt(evt.target.name));
    console.log('This is the cart ID-->', this.props.cart.id);
    console.log(
      'This is the event target value-->',
      parseInt(evt.target.value)
    );

    const plantId = parseInt(evt.target.name);
    const userId = this.props.auth.id;
    const quantity = parseInt(evt.target.value);

    setQuantity(plantId, userId, quantity);
  }
  render() {
    if (!this.props.cart) {
      return <h3>Your cart is empty!</h3>;
    }
    const cart = this.props.cart;
    // console.log('PROPS-->', this.props);
    if (!cart.plants) {
      return <h3>loading your cart...</h3>;
    }
    return (
      <div>
        <Navbar />
        <h4>{`${
          this.props.auth.username[0].toUpperCase() +
          this.props.auth.username.slice(1)
        }'s Cart`}</h4>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.plants.map((plant) => {
              return (
                <tr key={plant.id}>
                  <td>{plant.name}</td>
                  <td>{`$${plant.price / 100}`}</td>
                  <td>
                    <div>
                      <select name={plant.id} onChange={this.handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </select>
                    </div>
                  </td>
                  <td name="total">{`$${plant.price / 100}`}</td>
                  <td>
                    <button
                      type="submit"
                      onClick={() => {
                        this.props.removeFromCart(plant, this.props.auth.id);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>
                <strong>Total: </strong>
              </td>
              <td></td>
              <td></td>
              <td>
                <strong>
                  {cart.plants
                    .reduce((accum, plant) => {
                      return accum + plant.price / 100;
                    }, 0)
                    .toFixed(2)}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="submit"
          onClick={() => {
            this.props.checkOut(cart.id);
          }}
        >
          Checkout
        </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return { cart: state.cart, auth: state.auth };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    getCart: (userId) => dispatch(getCart(userId)),
    removeFromCart: (plant, userId) => dispatch(removeFromCart(plant, userId)),
    setQuantity: (plantId, userId, quantity) =>
      dispatch(setQuantity(plantId, userId, quantity)),
    checkOut: (cartId) => dispatch(checkOut(cartId, history)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
