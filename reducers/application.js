import * as actionTypes from '@actions/actionTypes';

const initialState = {
    order: [],
    booking: [],
    urgent: [],
    urgentOrders: [],
    bookingOrders: [],
    // define here for future initialState 
};

export default (state = initialState, action = {}) => {
    // use switch case (prepare for future state)
    switch (action.type) {
      case actionTypes.ADD_ORDER:
        return {
          ...state,
          order: action.order,
        };
      case actionTypes.ADD_BOOKING:
        return {
          ...state,
          booking: action.booking,
        };
      case actionTypes.UPDATE_BOOKING:
        return {
          ...state,
          bookingOrders: state.bookingOrders.map(order =>
            order._id === action.booking._id ? { ...order, ...action.booking } : order
          ),
        };
      case actionTypes.ADD_URGENT:
        return {
          ...state,
          urgent: action.urgent,
        };
      case actionTypes.UPDATE_URGENT:
        return {
          ...state,
          urgentOrders: state.urgentOrders.map(order =>
            order._id === action.urgent._id ? { ...order, ...action.urgent } : order
          ),
        };
      case actionTypes.CLEAR_ORDER:
        return {
            ...state,
            order: [],
        };
      case actionTypes.CLEAR_BOOKING:
        return {
            ...state,
            booking: null,
        };
      case actionTypes.CLEAR_URGENT:
        return {
            ...state,
            urgent: null,
        };
      default:
        return state;
    }
  };