import axios from "axios";

const SET_PlANT = "SET_PlANT";

const setplant = (plant) => {
  return {
    type: SET_PlANT,
    plant,
  };
};

export const fetchPlant = (id, history) => {
  return async (dispatch) => {
    const { data: plant } = await axios.get(`/api/plant/${id}`);
 //   if (!plant) {
 //     history.push("/plant-not-found");
 //   } else {
      dispatch(setplant(plant));
 //   }
  };
};

export default function singlePlantReducer(state = {}, action) {
    switch (action.type) {
      case SET_plant:
        return action.plant;
      default:
        return state;
    }
  }
  