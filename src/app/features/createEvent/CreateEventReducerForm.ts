import { initialStateFormTypes } from './createEvent.types';

export const initialStateForm: initialStateFormTypes = {
  errorHandler: '',
  position: [0, 0],
  addressMap: { country: '', city: '', detail: '' },
  categoriesChecked: [],
};

export const reducerForm = (state: any, action: { type: any; payload: any }) => {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, errorHandler: action.payload };
    case 'SET_POSITION':
      return { ...state, position: action.payload };
    case 'SET_ADDRESS':
      return { ...state, addressMap: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categoriesChecked: action.payload };
    default:
      return state;
  }
};
