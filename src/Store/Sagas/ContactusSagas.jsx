import { takeEvery, put } from "redux-saga/effects";
import {
  ADD_CONTACT_US,
  ADD_CONTACT_US_RED,
  DELETE_CONTACT_US,
  DELETE_CONTACT_US_RED,
  GET_CONTACT_US,
  GET_CONTACT_US_RED,
  UPDATE_CONTACT_US,
  UPDATE_CONTACT_US_RED,
} from "../Constants";
import {
  addRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Services/ContactusServices";

function* addSaga(action) {
  // addRecord service call data pass then api call got response
  let response = yield addRecord(action.payload);

  // response then modified and send further to reducer
  yield put({ type: ADD_CONTACT_US_RED, payload: response });
}

function* getSaga() {
  let response = yield getRecord();
  yield put({ type: GET_CONTACT_US_RED, payload: response });
}

function* updateSaga(action) {
  yield updateRecord(action.payload);
  yield put({ type: UPDATE_CONTACT_US_RED, payload: action.payload });
}

function* deleteSaga(action) {
  yield deleteRecord(action.payload);
  yield put({ type: DELETE_CONTACT_US_RED, payload: action.payload });
}

// this function runs everytime
export default function* contactusSagas() {
  // at the time of action add maincatergory hit addSaga function calls
  yield takeEvery(ADD_CONTACT_US, addSaga);
  yield takeEvery(GET_CONTACT_US, getSaga);
  yield takeEvery(UPDATE_CONTACT_US, updateSaga);
  yield takeEvery(DELETE_CONTACT_US, deleteSaga);
}
