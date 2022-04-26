const INICIAL_STATE = {
  placeHolder: '',
};

const placeHolder = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_PLACEHOLDER':
    return { ...state, placeHolder: action.payload };
  default:
    return state;
  }
};

export default placeHolder;
