import React from 'react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
// import { render as rtlRender } from '@testing-library/react';
import { render } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import rootReducer from '../../reducers/index';

// const createMockStore = (initialState) => (
//   createStore(combineReducers({ rootReducer }), initialState, applyMiddleware(thunk))
// );

// const renderWithReduxAndRouter = (
//   component, { initialState, store = createMockStore(initialState) } = {},
// ) => {
//   const history = createMemoryHistory();

//   return ({
//     ...rtlRender(
//       <Router history={ history }>
//         <Provider store={ store }>
//           {component}
//         </Provider>
//       </Router>,
//     ),
//     store,
//     history });
// };

// export default renderWithReduxAndRouter;

// renderwithRouterAndRedux usada na aula ao vivo 15.5 - ministrada por Thiago Braddock -> turma 19-a
const renderWithRouterAndRedux = (
  component, // componente a ser renderizado
  {
    // estado inicial para o nosso reducer
    initialState = {},

    // caso você passe uma store por parÂmetro ela será utilizada
    // caso contrário vai chamar a função createStore e criar uma nova
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),

    // rota inicial da nossa aplicaçãp
    initialEntries = ['/'],

    // caso você passe um history por parâmetro ele será utilizado
    // caso contrário vai chamar a funcao createMemoryHistory e criar um novo
    history = createMemoryHistory({ initialEntries }),

  } = {},

) => ({ // arrow function que retorna um objeto

  // spread do retorno do render {getByTestId, getByrole, etc }
  ...render(
    <Router history={ history }>
      <Provider store={ store }>
        {component}
      </Provider>
    </Router>,
  ),

  // history usado acima
  history,

  // store usada acima
  store,
});

export default renderWithRouterAndRedux;
