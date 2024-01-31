import { createStore } from 'redux'

const initialState = {
  sidebarUnfoldable: false,
  isLoggedIn: false,
  dataUser: {},
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
      break
    case 'login':
      return { ...state, ...rest, isLoggedIn: true }
      break
    case 'logout':
      return { ...state, rest, isLoggedIn: false }
      break
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
