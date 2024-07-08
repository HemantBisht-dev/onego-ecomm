import { takeEvery, put } from "redux-saga/effects";
import {
  ADD_WISHLIST,
  ADD_WISHLIST_RED,
  DELETE_WISHLIST,
  DELETE_WISHLIST_RED,
  GET_WISHLIST,
  GET_WISHLIST_RED,
  UPDATE_WISHLIST,
  UPDATE_WISHLIST_RED,
} from "../Constants";
import {
  addRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Services/WishlistServices";

function* addSaga(action) {
  // addRecord service call data pass then api call got response
  let response = yield addRecord(action.payload);

  // response then modified and send further to reducer
  yield put({ type: ADD_WISHLIST_RED, payload: response });
}

function* getSaga() {
  let response = yield getRecord();
  yield put({ type: GET_WISHLIST_RED, payload: response });
}

function* updateSaga(action) {
  yield updateRecord(action.payload);
  yield put({ type: UPDATE_WISHLIST_RED, payload: action.payload });
}

function* deleteSaga(action) {
  yield deleteRecord(action.payload);
  yield put({ type: DELETE_WISHLIST_RED, payload: action.payload });
}

// this function runs everytime
export default function* wishlistSagas() {
  // at the time of action add maincatergory hit addSaga function calls
  yield takeEvery(ADD_WISHLIST, addSaga);
  yield takeEvery(GET_WISHLIST, getSaga);
  yield takeEvery(UPDATE_WISHLIST, updateSaga);
  yield takeEvery(DELETE_WISHLIST, deleteSaga);
}
