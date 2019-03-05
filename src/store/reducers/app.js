import { ActionTypes } from '../../constants';

const defaultState = {
    map_data: [],
    trips: [],
    single_trip: false,
    dates: [],
    date_trip: false,
    time_trip: false,
    time: [
        '00:00:00-01:00:00',
        '01:00:00-02:00:00',
        '02:00:00-03:00:00',
        '03:00:00-04:00:00',
        '04:00:00-05:00:00',
        '05:00:00-06:00:00',
        '06:00:00-07:00:00',
        '07:00:00-08:00:00',
        '09:00:00-10:00:00',
        '10:00:00-11:00:00',
        '11:00:00-12:00:00',
        '12:00:00-13:00:00',
        '13:00:00-14:00:00',
        '14:00:00-15:00:00',
        '15:00:00-16:00:00',
        '16:00:00-17:00:00',
        '17:00:00-18:00:00',
        '18:00:00-19:00:00',
        '19:00:00-20:00:00',
        '20:00:00-21:00:00',
        '21:00:00-22:00:00',
        '22:00:00-23:00:00',
        '23:00:00-00:00:00',
    ],
};


function appReducer(state = defaultState, action) {
    switch(action.type) {
        case ActionTypes.LOAD_DATA: 
            return {
                ...state,
                map_data: action.data
            }
        case ActionTypes.SET_TRIPS:
            return {
                ...state,
                trips: action.data
            }
        case ActionTypes.SET_SINGLE_TRIP:
            return {
                ...state,
                single_trip: action.data
            }
        case ActionTypes.SET_DATES:
            return {
                ...state,
                dates: action.data
            }
        case ActionTypes.SET_TIME:
            return {
                ...state,
                time: action.data
            }
        case ActionTypes.SET_DATE_TRIP:
            return {
                ...state,
                date_trip: action.data
            }
        case ActionTypes.SET_TIME_TRIP:
            return {
                ...state,
                time_trip: action.data
            }
        default:
            return state;
    }
}


export default appReducer;