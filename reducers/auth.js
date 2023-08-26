import * as actionTypes from '@actions/actionTypes';

const initialState = {
  login: {
    success: false,
    loggedIn: false,
    userId: [],
  },
  logout: {
    success: false,
    loggedIn: false,
    userId: [],
  },
  
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          success: true,
          loggedIn: true,
          userId: action.data,
        },

      };
      case actionTypes.LOGIN_ERROR:
        return {
          ...state,
          login: {
            ...state.login,
            success: false,
            loggedIn: false,
            userId: [],
          },
          logout: {
            ...state.logout,
            success: false,
            loggedIn: false,
            userId: []
          },
        };
    default:
      return state;
  }
};
