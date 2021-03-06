import React from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { checkOut, guestCheckout } from "../store/cart";
import { Link } from "react-router-dom";

const distinctPlantsInCart = [];

class GuestCart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: {}, 
      quantity: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildNewCart = this.buildNewCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  componentDidMount() {
    let cart = window.localStorage.getItem("cart");
    let parsedCart = JSON.parse(cart);

    //to keep track of quantity
    const hashifyCartArray = (cartArray) => {
      let cartHashTable = {};
      cartArray.forEach((item) => {
        if (!cartHashTable[item.name]) {
          cartHashTable[item.name] = {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
          };
          distinctPlantsInCart.push(item)
        } else {
          cartHashTable[item.name].quantity =
            cartHashTable[item.name].quantity + 1;
        }
      });
      return cartHashTable;
    };

    const hashedCart = hashifyCartArray(parsedCart);
    this.setState({
      cart: hashedCart,
    });
  }

  handleChange(evt) {
    this.setState({ quantity: evt.target.value });
  }

  removeFromCart (plantName) {
    //removing item from state
    let stateCartCopy = {...this.state.cart};
    delete stateCartCopy[plantName]
    this.setState({
      cart: stateCartCopy
    });

    //removing item from local storage
    const newCart = this.buildNewCart(stateCartCopy)
    window.localStorage.setItem("cart", JSON.stringify(newCart))

  }
  
  //helper function to reformat the state cart to match localStorage cart
  buildNewCart (stateCartObj) {
    const newCart = [];
    for (let plant in stateCartObj) {
      let plantQty = stateCartObj[plant].quantity;
      for (let i=0; i < distinctPlantsInCart.length; i++) {
        if (stateCartObj[plant].id === distinctPlantsInCart[i].id) {
          while (plantQty > 0) {
            newCart.push(distinctPlantsInCart[i])
            plantQty = plantQty - 1
          }
        }
      }
    }
    return newCart;
  }

  handleSubmit(event) {
    //change the quantity in this.state.cart
    let stateCartCopy = {...this.state.cart};
    const plantToChange = event.target.name
    stateCartCopy[plantToChange].quantity = this.state.quantity

    this.setState({
      cart: stateCartCopy,
      quantity: '',
    });
    
    //change the quantity in local storage
    const newCart = this.buildNewCart(this.state.cart)
    window.localStorage.setItem("cart", JSON.stringify(newCart))
  }


  render() {
    let cartInLocalStorage = window.localStorage.getItem("cart");
    if (cartInLocalStorage === "[]") {
      return (
        <div>
          <Navbar />
          <h3>Your cart is empty!</h3>
        </div>
      );
    }
    //arrayify the cart hash table to render using map method
    const arrayify = (cartHashTable) => {
      let array = [];
      for (let item in cartHashTable) {
        array.push(cartHashTable[item]);
      }
      return array;
    };
    let arrayifiedCart = arrayify(this.state.cart);
    const formatToCurrency = (amount) => {
      return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    };
    let plantIdArrays = distinctPlantsInCart.map((plant) => plant.id);
    console.log(plantIdArrays);
    return (
      <div>
        <Navbar />
        <h4>Hello Guest,</h4>
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
            {arrayifiedCart.map((plant, idx) => {
              return (
                <tr key={idx}>
                  <td>{plant.name}</td>
                  <td>{`${formatToCurrency(plant.price / 100)}`}</td>
                  <td>
                    {plant.quantity}
                    <div>
                      <form name={plant.name} id={plant.id} onSubmit={this.handleSubmit}>
                        <input
                          type="text"
                          name="quantity"
                          
                          onChange={this.handleChange}
                          style={{ width: "20px" }}
                        />
                        <button type="submit"> Update </button>
                      </form>
                    </div>
                  </td>
                  <td name="total">{`${formatToCurrency(
                    plant.price / 100 * plant.quantity
                  )}`}</td>
                  <td>
                    <button
                      type="submit"
                      onClick={() => {
                        this.removeFromCart(plant.name)
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
                    arrayifiedCart.reduce((accum, plant) => {
                      return (
                        accum +
                        (plant.price / 100) * plant.quantity
                      );
                    }, 0)
                  )}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
        <Link to={"/checkout"}>
          <button
            type="submit"
            onClick={() => {
              console.log(distinctPlantsInCart)
              this.props.guestCheckout(plantIdArrays);
            }}
          >
            Checkout
          </button>
        </Link>
      </div>
    );
  };
}

const mapDispatch = (dispatch, { history }) => {
  return {
    checkOut: (cartId) => dispatch(checkOut(cartId, history)),
    guestCheckout: (plantsIdArray) => dispatch(guestCheckout(plantsIdArray))
  };
};

export default connect(null, mapDispatch)(GuestCart);
