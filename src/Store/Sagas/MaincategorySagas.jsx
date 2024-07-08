import { takeEvery, put } from "redux-saga/effects";
import {
  ADD_MAINCATEGORY,
  ADD_MAINCATEGORY_RED,
  DELETE_MAINCATEGORY,
  DELETE_MAINCATEGORY_RED,
  GET_MAINCATEGORY,
  GET_MAINCATEGORY_RED,
  UPDATE_MAINCATEGORY,
  UPDATE_MAINCATEGORY_RED,
} from "../Constants";
import {
  addRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Services/MaincategoryServices";

function* addSaga(action) {
  // addRecord service call data pass then api call got response
  let response = yield addRecord(action.payload);

  // response then modified and send further to reducer
  yield put({ type: ADD_MAINCATEGORY_RED, payload: response });
}

function* getSaga() {
  let response = yield getRecord();
  yield put({ type: GET_MAINCATEGORY_RED, payload: response });
}

function* updateSaga(action) {
  yield updateRecord(action.payload);
  yield put({ type: UPDATE_MAINCATEGORY_RED, payload: action.payload });
}

function* deleteSaga(action) {
  yield deleteRecord(action.payload);
  yield put({ type: DELETE_MAINCATEGORY_RED, payload: action.payload });
}

// this function runs everytime
export default function* maincategorySagas() {
  // at the time of action add maincatergory hit addSaga function calls
  yield takeEvery(ADD_MAINCATEGORY, addSaga);
  yield takeEvery(GET_MAINCATEGORY, getSaga);
  yield takeEvery(UPDATE_MAINCATEGORY, updateSaga);
  yield takeEvery(DELETE_MAINCATEGORY, deleteSaga);
}
