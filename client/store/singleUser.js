import axios from 'axios';
import { me } from './auth';

const  SINGLE_USER = 'SINGLE_USER';

const _singleUser = (user) => {
  return {
    type: SINGLE_USER,
    user
  }
}

export const fetchUser = (id, history) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/users/${id}`);
  //  if (!plant) {
  //    history.push("/plant-friends");
  //  } else {
    console.log('what is my single user data', data)
      dispatch(_singleUser(data));
  //  }
  };
};

export default function singleUserReducer(state = {}, action) {
  switch (action.type) {
    case SINGLE_USER:
      return action.user;
    default:
      return state;
  }
}