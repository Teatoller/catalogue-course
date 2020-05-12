import { createStore, applyMiddleware, compose } from "redux";
import rootReducers from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import { createLogger } from "redux-logger";
import ReduxThunk from "redux-thunk";

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const logger = createLogger({
    //...options
  });

  return createStore(
    rootReducers,
    initialState,
    composeEnhancers(
      applyMiddleware(ReduxThunk, reduxImmutableStateInvariant(), logger)
    )
  );
}
