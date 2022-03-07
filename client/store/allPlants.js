import axios from 'axios';

const SET_PLANTS = 'SET_PLANTS';
const CREATE_PLANT = 'CREATE_PLANT';
const DELETE_PLANT = 'DELETE_PLANT'

const _deletePlant = (plant) => {
  return {
    type: DELETE_PLANT,
    plant
  }
}

const _setPlants = (plants) => {
  return {
    type: SET_PLANTS,
    plants,
  };
};

const _createPlant = (plant) => {
  return {
    type: CREATE_PLANT,
    plant,
  };
};

export const deleteAPlant = (id, history) => {
  return async (dispatch) => {
    const { data } = await axios.delete(`/api/plant-friends/${id}`);
    dispatch(_deletePlant(data));
    history.push('/plant-friends');
  };
};

export const fetchPlants = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/plant-friends');
      dispatch(_setPlants(data));
    } catch (err) {
      console.error('error in fetchPlants thunk!', err);
    }
  };
};

export const createPlant = (plant) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/plant-friends', plant);
      dispatch(_createPlant(data));
    } catch (error) {
      console.error('error in create plant', error);
    }
  };
};

export default function plantsReducer(state = [], action) {
  switch (action.type) {
    case SET_PLANTS:
      return action.plants;
    case CREATE_PLANT:
      return [...state, action.plant];
    case DELETE_PLANT:
      return state.filter((plant) => plant.id !== action.plant.id);
    default:
      return state;
  }
}
