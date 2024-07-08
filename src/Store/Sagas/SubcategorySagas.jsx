import { takeEvery, put } from "redux-saga/effects";
import {
  ADD_SUBCATEGORY,
  ADD_SUBCATEGORY_RED,
  DELETE_SUBCATEGORY,
  DELETE_SUBCATEGORY_RED,
  GET_SUBCATEGORY,
  GET_SUBCATEGORY_RED,
  UPDATE_SUBCATEGORY,
  UPDATE_SUBCATEGORY_RED,
} from "../Constants";
import {
  addRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Services/SubcategoryServices";

function* addSaga(action) {
  // addRecord service call data pass then api call got response
  let response = yield addRecord(action.payload);

  // response then modified and send further to reducer
  yield put({ type: ADD_SUBCATEGORY_RED, payload: response });
}

function* getSaga() {
  let response = yield getRecord();
  yield put({ type: GET_SUBCATEGORY_RED, payload: response });
}

function* updateSaga(action) {
  yield updateRecord(action.payload);
  yield put({ type: UPDATE_SUBCATEGORY_RED, payload: action.payload });
}

function* deleteSaga(action) {
  yield deleteRecord(action.payload);
  yield put({ type: DELETE_SUBCATEGORY_RED, payload: action.payload });
}

// this function runs everytime
export default function* subcategorySagas() {
  // at the time of action add maincatergory hit addSaga function calls
  yield takeEvery(ADD_SUBCATEGORY, addSaga);
  yield takeEvery(GET_SUBCATEGORY, getSaga);
  yield takeEvery(UPDATE_SUBCATEGORY, updateSaga);
  yield takeEvery(DELETE_SUBCATEGORY, deleteSaga);
}
