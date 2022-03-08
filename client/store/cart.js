import axios from 'axios';


// action constants
const GET_CART = 'GET_CART';
const SET_QUANTITY = 'SET_QUANTITY';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CHECKOUT = 'CHECKOUT';

// action creator
const _getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

const _setQuantity = (cart) => {
  return {
    type: SET_QUANTITY,
    cart,
  };
};

const _addToCart = (cart) => {
  return {
    type: ADD_TO_CART,
    cart,
  };
};

const _removeFromCart = (cart) => {
  return {
    type: REMOVE_FROM_CART,
    cart,
  };
};

const _checkout = (cart) => {
  return {
    type: CHECKOUT,
    cart
  }
}

// thunk
export const getCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/${userId}`);
      dispatch(_getCart(data));
    } catch (error) {
      console.error('error in getCart', error);
    }
  };
};

export const addToCart = (plant, userId) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(
        `/api/cart/add/${userId}`,
        plant
      );
      dispatch(_addToCart(updated));
    } catch (error) {
      console.error('error in the addToCart thunk!', error);
    }
  };
};

export const removeFromCart = (plant, userId) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(
        `/api/cart/remove/${userId}`,
        plant
      );
      dispatch(_removeFromCart(updated));
    } catch (error) {
      console.error('error in the removeFromCart thunk!', error);
    }
  };
};

export const setQuantity = (plantId, cartId, quantity) => {
  return async (dispatch) => {
    console.log('data', plantId, cartId, quantity);
    try {
      const { data } = await axios.put(`/api/cart/${cartId}`, {
        plantId,
        quantity,
      });
      console.log('THUNK QUANTITY DATA', data);
      dispatch(_setQuantity(data));
    } catch (error) {
      console.error('error in  setQuantity', error);
    }
  };
};

export const checkOut = (cartId, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/cart/checkout/${cartId}`, {isComplete: true});
      history.push('/plant-friends'); 
    } catch (error) {
      console.error('error in checkout thunk', error)
    }
  }
}

// subreducer
export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_TO_CART:
      return action.cart;
    case REMOVE_FROM_CART:
      return action.cart;
    case SET_QUANTITY:
      return action.cart;
    case CHECKOUT:
      return action.cart;
    default:
      return state;
  }
}
