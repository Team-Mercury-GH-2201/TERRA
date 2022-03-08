import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPlants, deleteAPlant } from "../store/allPlants";
import { addToCart, getCart, setQuantity } from "../store/cart";

import CreatePlant from "./CreatePlant";
import Navbar from "./Navbar";

export class AllPlants extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: []
    };
    // this.checkPlantInCart = this.checkPlantInCart.bind(this);
  }
  componentDidMount() {
    this.props.getPlants();
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
  // checkPlantInCart(plantObjId, array) {
    // for (let i = 0; i < array.length; i++) {
      // let currObj = array[i];
      // if (currObj.id === plantObjId) {
        // return true;
      // }
    // }
    // return false;
  // }
  render() {
    console.log('THIS.STATE', this.state);
    const plants = this.props.plants;
    const formatToCurrency = (amount) => {
      return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    };

    if (!plants || plants.length === 0) {
      return <h3> Loading your plants...</h3>;
    }
    return (
      <div>
        <Navbar />
        <div></div>
        {window.localStorage.getItem('isAdmin') === true.toString() ? (
          <div id="createPlantView">
            <h2>Add a new plant</h2>
            <CreatePlant />
          </div>
        ) : null}
        <ul id="allPlantsView">
          {console.log(this.props.plants)}
          {this.props.plants.map((plantObj, idx) => (
            <div className="PlantInfo" key={plantObj.id}>
              <h3>
                <Link to={`/plant-friends/${plantObj.id}`}>
                  {" "}
                  Plant Friend Name: {plantObj.name}
                </Link>
              </h3>
              <div />

              <img className="plant-image" src={plantObj.imageLink} />
              <div className="plant-attributes">
                <div>Species: {plantObj.species}</div>
                <div />
                <div>
                  About Your Plant Friend: <br /> {plantObj.description}
                </div>
                <div />
                <div>Care: {plantObj.careInstructions}</div>
              </div>
              <br />
              <div className="price">
                Price:
                {formatToCurrency(plantObj.price / 100)}
              </div>
              <button
                type="submit"
                onClick={() => {
                  // {plantObj in this.props.cart.plants ? this.props.setQuantity(plantObj.id, this.props.cart.id, plantObj) :

                  this.props.addToCart(plantObj, parseInt(this.props.auth.id));
                  window.alert('New plant friend added to cart!');
                  
                  if (this.props.auth.id) {
                    this.props.addToCart(
                      plantObj,
                      parseInt(this.props.auth.id)
                    );
                  } else {
                      let newPlants = [...this.state.cart];
                      newPlants.push(plantObj);
                      this.setState({cart: newPlants})
                      window.localStorage.setItem(
                        'cart',
                        JSON.stringify(newPlants)
                      );
                  // }
                }}
              }
              >
                Add to Cart
              </button>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    plants: state.plants,
    auth: state.auth,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getPlants: () => dispatch(fetchPlants()),
    deleteAPlant: (id) => dispatch(deleteAPlant(id, history)),
    addToCart: (plant, userId) => dispatch(addToCart(plant, userId)),
    getCart: (userId) => dispatch(getCart(userId)),
    setQuantity: (plantId, cartId, quantity) => dispatch(setQuantity(plantId, cartId, quantity)),
  };
};

export default connect(mapState, mapDispatch)(AllPlants);
