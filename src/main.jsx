import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import Store from "./Store/Store.jsx";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
);
