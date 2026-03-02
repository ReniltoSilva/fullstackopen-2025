import { useContext } from 'react'
import AlertContext from '../AlertContext'

const Notification = () => {
  const { alert } = useContext(AlertContext)

  const style = {
    border: 'solid',
    borderRadius: '3px',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  return <div style={style}>{alert}</div>
}

export default Notification
