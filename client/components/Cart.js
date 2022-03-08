import React from 'react';
import { connect } from 'react-redux';
import { getCart, removeFromCart, setQuantity, checkOut } from '../store/cart';
import { Checkout } from './Checkout';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    let userId = this.props.auth.id;
    this.props.getCart(userId);
  }
  // componentDidUpdate(prevProps) {
    // if (prevProps.cart.id !== this.props.cart.id) {
      // this.setState({
        // quantity: this.props.cart.plants[this.state.plantId]['plant-cart'].quantity
      // })
    // }
  // }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSubmit(event) {
    // event.preventDefault();
    const plantId = parseInt(event.target.name);
    const quantity = parseInt(this.state.quantity);
    const cartId = this.props.cart.id;
    this.props.setQuantity(plantId, cartId, quantity);
    this.setState({
      quantity: '',
    });
  }
  render() {
    if (!this.props.cart) {
      return <h3>Your cart is empty!</h3>;
    }
    const cart = this.props.cart;
    if (!cart.plants) {
      return <h3>loading your cart...</h3>;
    }
    const formatToCurrency = (amount) => {
      return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

    return (
      <div>
        <Navbar />
        <h4>{`${
          this.props.auth.username[0].toUpperCase() +
          this.props.auth.username.slice(1)
        }'s Cart`}</h4>
        <table id="cart-table">
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
                  <td>{formatToCurrency(plant.price / 100)}</td>
                  <td>
                    {' '}
                    {plant['plant-cart'].quantity}
                    <div>
                      <form name={plant.id} onSubmit={this.handleSubmit}>
                        <input
                          type="text"
                          name="quantity"
                          onChange={this.handleChange}
                          style={{ width: '20px' }}
                        />
                        <button type="submit"> Update </button>
                      </form>
                    </div>
                  </td>
                  <td name="total">
                    {formatToCurrency(
                      (plant.price / 100) * plant['plant-cart'].quantity
                    )}
                  </td>
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
                  {formatToCurrency(
                    cart.plants.reduce((accum, plant) => {
                      return (
                        accum +
                        (plant.price / 100) * plant['plant-cart'].quantity
                      );
                    }, 0)
                  )}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
        <Link to={'/checkout'}>
          <button
            type="submit"
            onClick={() => {
              this.props.checkOut(cart.id);
            }}
          >
            Checkout
          </button>
        </Link>
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
    setQuantity: (plantId, cartId, quantity) =>
      dispatch(setQuantity(plantId, cartId, quantity)),
    checkOut: (cartId) => dispatch(checkOut(cartId, history)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
