import { compose, applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";

import thunk from "redux-thunk";
import reducer from "./reducers";

const middleware = applyMiddleware(thunk, createLogger());
let store = compose(createStore)(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), middleware);

export default store;