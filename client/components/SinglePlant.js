import React from 'react';
import { connect } from 'react-redux';
import { fetchPlant } from '../store/singlePlant';
import { getCart, addToCart } from '../store/cart';
import { deleteAPlant } from '../store/allPlants';
import { Link } from 'react-router-dom';
import EditPlant from './EditPlant';
import Navbar from './Navbar'

export class SinglePlant extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: []
    };
  }
  componentDidMount() {
    this.props.fetchPlant(this.props.match.params.id);
    if (this.props.auth.id) {
      this.props.getCart(parseInt(this.props.auth.id));
    } else {
      let cart = window.localStorage.getItem('cart');
      if (!cart) {
        cart = window.localStorage.setItem(
          'cart',
          JSON.stringify([])
        );
      } else {
        this.setState({
          cart: JSON.parse(cart),
        });
      }
    }
  }
 
  render() {

    const formatToCurrency = (amount) => {
      return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    };


    return (
      <div>
        <Navbar />
        <div></div>
        <ul id="singlePlant">
          <div>
            <strong>Plant Friend Name: {this.props.plant.name}</strong>
          </div>
          <img src={this.props.plant.imageLink} />
          <div>Species: {this.props.plant.species}</div>
          <div>About Your Plant Friend: {this.props.plant.description}</div>
          <div>Care: {this.props.plant.careInstructions}</div>
          <div>Price: {formatToCurrency(this.props.plant.price/100)}</div>
        </ul>
        <button
          type="submit"
          onClick={() => {

            window.alert('New plant friend added to cart!');

            if (this.props.auth.id) {
              this.props.addToCart(
                this.props.plant,
                parseInt(this.props.auth.id)
              );
            } else {
                let newPlants = [...this.state.cart];
                newPlants.push(this.props.plant);
                this.setState({cart: newPlants})
                window.localStorage.setItem(
                  'cart',
                  JSON.stringify(newPlants)
                );
            }
          }
        }
            >Add to Cart</button>
        <div>
          {this.props.auth.isAdmin ?  (
          <div>
          <EditPlant match={this.props.match} history={this.props.history} />
          <span>
            <button
              match={this.props.match}
              history={this.props.history}
              type="button"
              className="remove"
              onClick={() => {
                this.props.deleteAPlant(this.props.plant.id)
              }
            }
            >
              Delete
            </button>
          </span>
          </div>) : null }
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    plant: state.plant,
    auth: state.auth,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchPlant: (id) => dispatch(fetchPlant(id)),
    getCart: (userId) => dispatch(getCart(userId)),
    addToCart: (plant, userId) => dispatch(addToCart(plant, userId)),
    deleteAPlant: (id) => dispatch(deleteAPlant(id, history)),
  };
};

export default connect(mapState, mapDispatch)(SinglePlant);
