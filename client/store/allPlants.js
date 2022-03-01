import axios from 'axios';

const SET_PLANTS = 'SET_PLANTS';

const _setPlants = (plants) => {
    return {
        type: SET_PLANTS,
        plants
    }
}

export const fetchPlants = () => {
    return async (dispatch) => {
        const { data: plants } = await axios.get('/api/plants')
        dispatch(_setPlants(plants))
    }
}


export default function plantsReducer(state=[], action) {
    switch (action.type) {
        case SET_PLANTS:
            return action.plants;
        default:
            return state;
    }
}