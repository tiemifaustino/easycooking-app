const INICIAL_STATE = {
  filter: '',
};

const filterReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case 'FILTER':
    return { ...state, filter: action.filter };
  default:
    return state;
  }
};

export default filterReducer;
