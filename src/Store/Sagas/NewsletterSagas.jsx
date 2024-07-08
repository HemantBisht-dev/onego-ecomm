import { takeEvery, put } from "redux-saga/effects";
import {
  ADD_NEWSLETTER,
  ADD_NEWSLETTER_RED,
  DELETE_NEWSLETTER,
  DELETE_NEWSLETTER_RED,
  GET_NEWSLETTER,
  GET_NEWSLETTER_RED,
} from "../Constants";
import {
  addRecord,
  deleteRecord,
  getRecord,
} from "./Services/NewsletterServices";

function* addSaga(action) {
  // addRecord service call data pass then api call got response
  let response = yield addRecord(action.payload);

  // response then modified and send further to reducer
  yield put({ type: ADD_NEWSLETTER_RED, payload: response });
}

function* getSaga() {
  let response = yield getRecord();
  yield put({ type: GET_NEWSLETTER_RED, payload: response });
}

function* deleteSaga(action) {
  yield deleteRecord(action.payload);
  yield put({ type: DELETE_NEWSLETTER_RED, payload: action.payload });
}

// this function runs everytime
export default function* newsletterSagas() {
  // at the time of action add maincatergory hit addSaga function calls
  yield takeEvery(ADD_NEWSLETTER, addSaga);
  yield takeEvery(GET_NEWSLETTER, getSaga);
  yield takeEvery(DELETE_NEWSLETTER, deleteSaga);
}
