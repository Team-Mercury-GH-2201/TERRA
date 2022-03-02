import axios from 'axios';

const SET_USERS = 'SET_USERS';

const _setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
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

export default function usersReducer(state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
}
