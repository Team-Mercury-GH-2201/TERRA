import axios from 'axios';
import { me } from './auth';

const SET_USERS = 'SET_USERS';
const CREATE_USER = 'CREATE_USER';

const _setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

const _createUser = (user) => {
  return {
    type: CREATE_USER,
    user,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/users');
      dispatch(_setUsers(data));
    } catch (err) {
      console.error('error in fetchUsers thunk!', err);
    }
  };
};

export const createUser = (user) => {
  const { username, password } = user;
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/users/signup', user);
      dispatch(_createUser(data));
      const res = await axios.post(`/auth/login`, {username, password})
      window.localStorage.setItem('token', res.data.token)
      dispatch(me())
    } catch (error) {
      console.error('error in createUser thunk!', error);
    }
  };
};

export default function usersReducer(state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case CREATE_USER:
      return [...state, action.user]
    default:
      return state;
  }
}
