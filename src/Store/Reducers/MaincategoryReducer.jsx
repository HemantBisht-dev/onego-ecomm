import {
  ADD_MAINCATEGORY_RED,
  DELETE_MAINCATEGORY_RED,
  GET_MAINCATEGORY_RED,
  UPDATE_MAINCATEGORY_RED,
} from "../Constants";

function MaincategoryReducer(state = [], action) {
  let newState, index;

  switch (action.type) {
    case ADD_MAINCATEGORY_RED:
      // getting a array of previous items
      newState = [...state];
      // push into newState
      newState.push(action.payload);
      return newState;

    case GET_MAINCATEGORY_RED:
      return action.payload.reverse();

    case UPDATE_MAINCATEGORY_RED:
      // getting index
      index = state.findIndex((x) => x.id === action.payload.id);
      // changing the name of that index
      state[index].name = action.payload.name;
      return state;

    case DELETE_MAINCATEGORY_RED:
      index = state.findIndex((x) => x.id === action.payload.id);
      newState = [...state];
      newState.splice(index, 1);
      return newState;

    default:
      return state;
  }
}
export default MaincategoryReducer;
