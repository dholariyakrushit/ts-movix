import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";

import "./assets/sass/style.scss";
import Router from "./router/Router";
import { store } from "./redux/store/store";


function App() {
  return (
    <>
    <Provider store={store}>
      <Router />
      </Provider>
    </>
  );
}

export default App;
