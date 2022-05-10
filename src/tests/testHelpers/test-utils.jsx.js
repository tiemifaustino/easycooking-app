import React from 'react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { render as rtlRender } from '@testing-library/react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import rootReducer from '../../reducers/index';

const createMockStore = (initialState) => (
  createStore(combineReducers({ rootReducer }), initialState, applyMiddleware(thunk))
);

const renderWithReduxAndRouter = (
  component, { initialState, store = createMockStore(initialState) } = {},
) => {
  const history = createMemoryHistory();

  return ({
    ...rtlRender(
      <Router history={ history }>
        <Provider store={ store }>
          {component}
        </Provider>
      </Router>,
    ),
    store,
    history });
};

export default renderWithReduxAndRouter;

/* import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers/index';

function render(
  ui,
  {
    preloadedState,
    store = configureStore( rootReducer ),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={ store }>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render }; */
