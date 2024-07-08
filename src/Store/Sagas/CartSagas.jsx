import { takeEvery, put } from "redux-saga/effects";
import {
  ADD_CART,
  ADD_CART_RED,
  DELETE_CART,
  DELETE_CART_RED,
  GET_CART,
  GET_CART_RED,
  UPDATE_CART,
  UPDATE_CART_RED,
} from "../Constants";
import {
  addRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Services/CartServices";

function* addSaga(action) {
  // addRecord service call data pass then api call got response
  let response = yield addRecord(action.payload);

  // response then modified and send further to reducer
  yield put({ type: ADD_CART_RED, payload: response });
}

function* getSaga() {
  let response = yield getRecord();
  yield put({ type: GET_CART_RED, payload: response });
}

function* updateSaga(action) {
  yield updateRecord(action.payload);
  yield put({ type: UPDATE_CART_RED, payload: action.payload });
}

function* deleteSaga(action) {
  yield deleteRecord(action.payload);
  yield put({ type: DELETE_CART_RED, payload: action.payload });
}

// this function runs everytime
export default function* cartSagas() {
  // at the time of action add maincatergory hit addSaga function calls
  yield takeEvery(ADD_CART, addSaga);
  yield takeEvery(GET_CART, getSaga);
  yield takeEvery(UPDATE_CART, updateSaga);
  yield takeEvery(DELETE_CART, deleteSaga);
}
