import { takeEvery, put } from "redux-saga/effects";
import {
  ADD_TESTIMONIAL,
  ADD_TESTIMONIAL_RED,
  DELETE_TESTIMONIAL,
  DELETE_TESTIMONIAL_RED,
  GET_TESTIMONIAL,
  GET_TESTIMONIAL_RED,
  UPDATE_TESTIMONIAL,
  UPDATE_TESTIMONIAL_RED,
} from "../Constants";
import {
  addRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Services/TestimonialServices";

function* addSaga(action) {
  // addRecord service call data pass then api call got response
  let response = yield addRecord(action.payload);

  // response then modified and send further to reducer
  yield put({ type: ADD_TESTIMONIAL_RED, payload: response });
}

function* getSaga() {
  let response = yield getRecord();
  yield put({ type: GET_TESTIMONIAL_RED, payload: response });
}

function* updateSaga(action) {
  yield updateRecord(action.payload);
  yield put({ type: UPDATE_TESTIMONIAL_RED, payload: action.payload });
}

function* deleteSaga(action) {
  yield deleteRecord(action.payload);
  yield put({ type: DELETE_TESTIMONIAL_RED, payload: action.payload });
}

// this function runs everytime
export default function* testimonialSagas() {
  // at the time of action add maincatergory hit addSaga function calls
  yield takeEvery(ADD_TESTIMONIAL, addSaga);
  yield takeEvery(GET_TESTIMONIAL, getSaga);
  yield takeEvery(UPDATE_TESTIMONIAL, updateSaga);
  yield takeEvery(DELETE_TESTIMONIAL, deleteSaga);
}
