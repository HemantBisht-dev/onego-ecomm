import { takeEvery, put } from "redux-saga/effects";
import {
  ADD_CHECKOUT,
  ADD_CHECKOUT_RED,
  DELETE_CHECKOUT,
  DELETE_CHECKOUT_RED,
  GET_CHECKOUT,
  GET_CHECKOUT_RED,
  UPDATE_CHECKOUT,
  UPDATE_CHECKOUT_RED,
} from "../Constants";
import {
  addRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Services/CheckoutServices";

function* addSaga(action) {
  // addRecord service call data pass then api call got response
  let response = yield addRecord(action.payload);

  // response then modified and send further to reducer
  yield put({ type: ADD_CHECKOUT_RED, payload: response });
}

function* getSaga() {
  let response = yield getRecord();
  yield put({ type: GET_CHECKOUT_RED, payload: response });
}

function* updateSaga(action) {
  yield updateRecord(action.payload);
  yield put({ type: UPDATE_CHECKOUT_RED, payload: action.payload });
}

function* deleteSaga(action) {
  yield deleteRecord(action.payload);
  yield put({ type: DELETE_CHECKOUT_RED, payload: action.payload });
}

// this function runs everytime
export default function* checkoutSagas() {
  // at the time of action add maincatergory hit addSaga function calls
  yield takeEvery(ADD_CHECKOUT, addSaga);
  yield takeEvery(GET_CHECKOUT, getSaga);
  yield takeEvery(UPDATE_CHECKOUT, updateSaga);
  yield takeEvery(DELETE_CHECKOUT, deleteSaga);
}
