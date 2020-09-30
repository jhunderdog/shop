import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

let alert초기값 = true;
function reducer2(state = alert초기값, 액션) {
  if (액션.type === "alert삭제") {
    return false;
  }
  return state;
}

let 초기값 = [
  { id: 0, name: "멋진신발", quantity: 2 },
  { id: 1, name: "구린신발", quantity: 10 },
];
function reducer(state = 초기값, 액션) {
  if (액션.type === "항목추가") {
    let copy = [...state];
    copy.push(액션.payload);
    return copy;
  }
  if (액션.type === "수량증가") {
    let copy = [...state];
    copy[0].quantity++;
    return copy;
  } else if (액션.type === "수량감소") {
    let copy = [...state];
    copy[0].quantity--;
    return copy;
  } else {
    return state;
  }
}

let store = createStore(combineReducers({ reducer, reducer2 }));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
