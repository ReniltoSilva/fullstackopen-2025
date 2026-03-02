import { createContext, useReducer } from 'react'

const AlertContext = createContext()

const alertReducer = (state, action) => {
  switch (action.type) {
    case 'created':
      return action.payload
    case 'voted':
      return action.payload
    case 'error':
      return action.payload
    default:
      return state
  }
}

export const AlertContextProvider = (props) => {
  const [alert, alertDispatch] = useReducer(
    alertReducer,
    'Render notification here...',
  )

  return (
    <AlertContext.Provider value={{ alert, alertDispatch }}>
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertContext
