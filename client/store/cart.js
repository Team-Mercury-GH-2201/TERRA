import axios from 'axios';

// action constants
const GET_CART = 'GET_CART';
const SET_QUANTITY = 'SET_QUANTITY';
const ADD_TO_CART = 'ADD_TO_CART';

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
  return  {
    type: ADD_TO_CART,
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

export const addToCart = (plantId, userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/cart/${userId}`, plantId);
      console.log('THUNK DATA', data)
      dispatch(_addToCart(data));
    } catch (error) {
      
    }
  }
}


export const setQuantity = (plantId, userId, quantity) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(`/api/cart/${userId}`, {
        plantId,
        quantity,
      });
      console.log('THUNK QUANTITY DATA', updated);
      dispatch(_setQuantity(updated));
    } catch (error) {
      console.error('error in  setQuantity', error);
    }
  };
};

// subreducer
export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_TO_CART:
      return action.cart;
    case SET_QUANTITY:
      return action.cart;
    default:
      return state;
  }
}
