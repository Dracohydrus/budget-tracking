import { ACTIONS } from "./Actions"

const Reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_START:
      return {
        user: null,
        isFetching: true,
        error: false
      }
    case ACTIONS.LOGIN_SUCCESS:
      return {
        user: action.payload,
        isFetching: false,
        error: false
      }
    case ACTIONS.LOGIN_FAILURE:
      return {
        user: null,
        isFetching: false,
        error: true
      }
    case ACTIONS.LOGOUT:
      return {
        user: null,
        isFetching: false,
        error: false
      }
    case ACTIONS.USER_UPDATE:
      return {
        user: action.payload,
        isFetching: false,
        error: false
      }
    default:
      return state;
  }
}

export default Reducer;