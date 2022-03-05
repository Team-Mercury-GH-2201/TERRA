import React from 'react';
import { connect } from 'react-redux';
import { getCart } from '../store/cart';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
  }
  componentDidMount() {
    let userId = this.props.auth;
    this.props.getCart(userId);
  }
  handleChange (evt) {
    setQuantity(plantId, evt.target.value);
  };
  render() {
    const cart = this.props.cart;
    console.log(this.props);
    if (!cart.plants) {
      return <h3>loading your cart...</h3>;
    }
    return (
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
          {cart.plants.map((plant, idx) => {
            return (
              <tr key={idx}>
                <td>{plant.name}</td>
                <td>{plant.price}</td>
                <td>
                  <div>
                    <li
                      onClick={onClick}
                      style={{
                        textDecoration: bought ? 'line-through' : 'none',
                      }}
                    >
                      Quantity
                    </li>
                    <select onChange={handleChange}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapState = (state) => {
  return { cart: state.cart, auth: state.auth.id };
};

const mapDispatch = (dispatch) => {
  return {
    getCart: (userId) => dispatch(getCart(userId)),
    setQuantity: (plantId, num) => dispatch(setQuantity(plantId, num))
  };
};

export default connect(mapState, mapDispatch)(Cart);
