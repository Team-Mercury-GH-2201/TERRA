import axios from 'axios';

// action constants
const GET_CART = 'GET_CART';
const SET_QUANTITY = 'SET_QUANTITY';

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
    case SET_QUANTITY:
      return action.cart;
    default:
      return state;
  }
}
