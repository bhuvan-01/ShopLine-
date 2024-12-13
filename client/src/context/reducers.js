export const reducers = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case 'LOGIN_PENDING':
      return {
        ...state,
        loading: true,
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };

    case 'ADD_PRODUCT':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        cart: state.cart.filter((prod) => prod._id !== action.payload.id),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
  }
};
