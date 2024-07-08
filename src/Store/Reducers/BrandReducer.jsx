import {
  ADD_BRAND_RED,
  DELETE_BRAND_RED,
  GET_BRAND_RED,
  UPDATE_BRAND_RED,
} from "../Constants";

function BrandReducer(state = [], action) {
  let newState, index;

  switch (action.type) {
    case ADD_BRAND_RED:
      // getting a array of previous items
      newState = [...state];
      // push into newState
      newState.push(action.payload);
      return newState;

    case GET_BRAND_RED:
      return action.payload.reverse();

    case UPDATE_BRAND_RED:
      // getting index
      index = state.findIndex((x) => x.id === action.payload.id);
      // changing the name of that index
      state[index].name = action.payload.name;
      state[index].pic = action.payload.pic;
      return state;

    case DELETE_BRAND_RED:
      index = state.findIndex((x) => x.id === action.payload.id);
      newState = [...state];
      newState.splice(index, 1);
      return newState;

    default:
      return state;
  }
}
export default BrandReducer;
