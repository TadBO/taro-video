import {
  SETSTATE,
  MINUS
} from '../constants/counter'

export const setState = () => {
  return {
    type: SETSTATE
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}

