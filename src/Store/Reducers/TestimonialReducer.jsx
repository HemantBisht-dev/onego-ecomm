import {
  ADD_TESTIMONIAL_RED,
  DELETE_TESTIMONIAL_RED,
  GET_TESTIMONIAL_RED,
  UPDATE_TESTIMONIAL_RED,
} from "../Constants";

function TestimonialReducer(state = [], action) {
  let newState, index;

  switch (action.type) {
    case ADD_TESTIMONIAL_RED:
      // getting a array of previous items
      newState = [...state];
      // push into newState
      newState.push(action.payload);
      return newState;

    case GET_TESTIMONIAL_RED:
      return action.payload.reverse();

    case UPDATE_TESTIMONIAL_RED:
      // getting index
      index = state.findIndex((x) => x.id === action.payload.id);
      // changing the name of that index
      state[index].name = action.payload.name;
      state[index].message = action.payload.message;
      state[index].star = action.payload.star;
      state[index].pic = action.payload.pic;
      return state;

    case DELETE_TESTIMONIAL_RED:
      index = state.findIndex((x) => x.id === action.payload.id);
      newState = [...state];
      newState.splice(index, 1);
      return newState;

    default:
      return state;
  }
}
export default TestimonialReducer;
