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
        try {
            const { data } = await axios.get('/api/plant-friends')
            console.log('plant data', data)
            dispatch(_setPlants(data))
        } catch(err) {
            console.error('error in fetchPlants thunk!', err)
        }
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