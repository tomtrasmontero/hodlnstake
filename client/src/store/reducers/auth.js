import * as actionTypes from '../actions/actionTypes';

const initialState = {
  authenticated: false,
  firebaseUID: '',
  errors: {},
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...initialState,
        loading: true,
      };

    case actionTypes.AUTH_SUCCESS:
      return {
        ...initialState,
        authenticated: true,
        firebaseUID: action.payload.localId || action.payload.firebaseUID,
        errors: {},
        loading: false,
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...initialState,
        errors: { ...action.payload },
        loading: false,
      };

    case actionTypes.AUTH_LOGOUT:
      return {
        ...initialState,
        authenticated: false,
        firebaseUID: '',
        errors: {},
      };

    default:
      return state;
  }
};

export default reducer;
