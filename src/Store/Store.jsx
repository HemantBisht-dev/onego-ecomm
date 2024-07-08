import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import RootSagas from "./Sagas/RootSaga";
import RootReducer from "./Reducers/RootReducer";

const SagaMiddleWare = createSagaMiddleware();

const Store = configureStore({
  reducer: RootReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(sagaMiddleware),
  // array because we can have multiple middleware in one application
  middleware: () => [SagaMiddleWare],
});

export default Store;
SagaMiddleWare.run(RootSagas);
