import { takeEvery, put } from "redux-saga/effects";
import {
  ADD_PRODUCT,
  ADD_PRODUCT_RED,
  DELETE_PRODUCT,
  DELETE_PRODUCT_RED,
  GET_PRODUCT,
  GET_PRODUCT_RED,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_RED,
} from "../Constants";
import {
  addRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Services/ProductServices";

function* addSaga(action) {
  // addRecord service call data pass then api call got response
  let response = yield addRecord(action.payload);

  // response then modified and send further to reducer
  yield put({ type: ADD_PRODUCT_RED, payload: response });
}

function* getSaga() {
  let response = yield getRecord();
  yield put({ type: GET_PRODUCT_RED, payload: response });
}

function* updateSaga(action) {
  yield updateRecord(action.payload);
  yield put({ type: UPDATE_PRODUCT_RED, payload: action.payload });
}

function* deleteSaga(action) {
  yield deleteRecord(action.payload);
  yield put({ type: DELETE_PRODUCT_RED, payload: action.payload });
}

// this function runs everytime
export default function* productSagas() {
  // at the time of action add maincatergory hit addSaga function calls
  yield takeEvery(ADD_PRODUCT, addSaga);
  yield takeEvery(GET_PRODUCT, getSaga);
  yield takeEvery(UPDATE_PRODUCT, updateSaga);
  yield takeEvery(DELETE_PRODUCT, deleteSaga);
}
