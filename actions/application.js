import * as actionTypes from './actionTypes';

const addOrder = order => {
    return {
      type: actionTypes.ADD_ORDER,
      order,
    };
};
const addBooking = booking => {
    return {
      type: actionTypes.ADD_BOOKING,
      booking,
    };
};

const updateBooking = booking => {
  return {
    type: actionTypes.UPDATE_BOOKING,
    booking,
  };
};

const addUrgent = urgent => {
    return {
      type: actionTypes.ADD_URGENT,
      urgent,
    };
};

const updateUrgent = urgent => {
  return {
    type: actionTypes.UPDATE_URGENT,
    urgent,
  };
};

const clearOrder = () => {
    return {
      type: actionTypes.CLEAR_ORDER,
    };
};
const clearBooking = () => {
    return {
      type: actionTypes.CLEAR_BOOKING,
    };
};
const clearUrgent = () => {
    return {
      type: actionTypes.CLEAR_URGENT,
    };
};

export const onAddOrder = order => dispatch => {
    dispatch(addOrder(order));
};

export const onClearOrder = () => dispatch => {
    dispatch(clearOrder());
}
export const onAddBooking = booking => dispatch => {
    dispatch(addBooking(booking));
};

export const onUpdateBooking = booking => dispatch => {
  dispatch(updateBooking(booking));
};

export const onClearBooking = () => dispatch => {
    dispatch(clearBooking());
}
export const onAddUrgent = urgent => dispatch => {
    dispatch(addUrgent(urgent));
};

export const onUpdateUrgent = urgent => dispatch => {
  dispatch(updateUrgent(urgent));
};

export const onClearUrgent = () => dispatch => {
    dispatch(clearUrgent());
}