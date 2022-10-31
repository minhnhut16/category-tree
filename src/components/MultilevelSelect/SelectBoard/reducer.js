export const initialState = {
  selectedOptions: [],
  options: [],
  isLoading: false,
};

export const ACTIONS = {
  SET_OPTIONS: 'SET_OPTIONS',
  SET_SELECTED_OPTIONS: 'SET_SELECTED_OPTIONS',

  ADD_OPTION: 'ADD_OPTION',
  DELETE_OPTION: 'DELETE_OPTION',

  TOGGLE_IS_LOADING: 'TOGGLE_IS_LOADING',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_IS_LOADING:
      return {
        ...state,
        isLoading: action.value,
      };
    case ACTIONS.SET_OPTIONS:
      return {
        ...state,
        options: action.value,
      };
    case ACTIONS.SET_SELECTED_OPTIONS:
      return {
        ...state,
        selectedOptions: action.value,
      };
    case ACTIONS.ADD_OPTION:
      return {
        ...state,
        options: state.options.filter(opt => opt.code !== action.value.id),
        selectedOptions: [
          {
            id: action.value.id,
            name: action.value.name,
          },
          ...state.selectedOptions,
        ],
      };
    case ACTIONS.REMOVE_OPTION:
      return {
        ...state,
        selectedOptions: state.selectedOptions.filter(opt => opt.id !== action.value.id),
        options: state.options.find(opt => opt.code === action.value.id)
          ? state.options
          : [
              {
                code: action.value.id,
                name: action.value.name,
              },
              ...state.options,
            ],
      };
    default:
      throw Error('not handler this action');
  }
};
