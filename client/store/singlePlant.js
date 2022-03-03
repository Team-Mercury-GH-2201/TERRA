import axios from "axios";

const SET_PLANT = "SET_PLANT";

const setplant = (plant) => {
  return {
    type: SET_PLANT,
    plant,
  };
};

export const fetchPlant = (id, history) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/plant-friends/${id}`);
  //  if (!plant) {
  //    history.push("/plant-friends");
  //  } else {
    console.log('what is my single plant data?', data)
      dispatch(setplant(data));
  //  }
  };
};

export default function singlePlantReducer(state = {}, action) {
    switch (action.type) {
      case SET_PLANT:
        return action.plant;
      default:
        return state;
    }
  }
  