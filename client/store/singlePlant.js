import axios from "axios";

const SET_PLANT = "SET_PLANT";
const EDIT_PLANT = 'EDIT_PLANT'

const setplant = (plant) => {
  return {
    type: SET_PLANT,
    plant,
  };
};

const _editPlant = (plant) => {
  return {
    type: EDIT_PLANT,
    plant
  }
}

export const updateAPlant = (plant, history) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/plant-friends/${plant.id}`, plant);
    dispatch(_editPlant(data));
    // dispatch(fetchPlants(data))
    history.push(`/plant-friends`);
  };
};

export const fetchPlant = (id, history) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/plant-friends/${id}`);
  //  if (!plant) {
  //    history.push("/plant-friends");
  //  } else {
      dispatch(setplant(data));
  //  }
  };
};

export default function singlePlantReducer(state = {}, action) {
    switch (action.type) {
      case SET_PLANT:
        return action.plant;
        case EDIT_PLANT:
          return action.plant;
      default:
        return state;
    }
  }
  