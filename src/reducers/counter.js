import { SETSTATE, GETSTATE } from '../constants/counter'

const INITIAL_STATE = {
 url: 'https://m.v.qq.com/',
 currentUrl: '',
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SETSTATE:
      return {
        ...state,
        ...action.payload
      }
    case GETSTATE:
      return {
        ...state,
      }
    default:
      return state
  }
}
