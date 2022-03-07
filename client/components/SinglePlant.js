import React from 'react';
import { connect } from 'react-redux';
import { fetchPlant } from '../store/singlePlant';
import { getCart, addToCart } from '../store/cart';
import { deleteAPlant } from '../store/allPlants';
import { Link } from 'react-router-dom';
import EditPlant from './EditPlant';
import Navbar from './Navbar'

export class SinglePlant extends React.Component {
  componentDidMount() {
    this.props.fetchPlant(this.props.match.params.id);
    this.props.getCart(parseInt(this.props.auth.id));
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
          onClick={() =>
            this.props.addToCart(this.props.plant, parseInt(this.props.auth.id))
          }
            >Add to Cart</button>
        <div>
          {window.localStorage.getItem('isAdmin') === true.toString() ?  (
          <div>
          <EditPlant match={this.props.match} history={this.props.history} />
          <span>
            <button
              match={this.props.match}
              history={this.props.history}
              type="button"
              className="remove"
              onClick={() => this.props.deleteAPlant(this.props.plant.id)}
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
