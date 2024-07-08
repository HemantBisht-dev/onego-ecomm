import {
  ADD_CONTACT_US,
  DELETE_CONTACT_US,
  GET_CONTACT_US,
  UPDATE_CONTACT_US,
} from "../Constants";

export function addContactus(data) {
  return {
    type: ADD_CONTACT_US,
    payload: data,
  };
}
export function getContactus() {
  return {
    type: GET_CONTACT_US,
  };
}
export function updateContactus(data) {
  return {
    type: UPDATE_CONTACT_US,
    payload: data,
  };
}
export function deleteContactus(data) {
  return {
    type: DELETE_CONTACT_US,
    payload: data,
  };
}
