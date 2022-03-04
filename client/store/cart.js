import axios from 'axios';

// action constants
const GET_CART = 'GET_CART';

// action creator
const _getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

// thunk
export const getCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/${userId}`);
      console.log('DATA', data);
      dispatch(_getCart(data));
    } catch (error) {
      console.error('error in getCart', error);
    }
  };
};

// subreducer
export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
};
