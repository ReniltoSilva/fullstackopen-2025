import {
  createDisplayNotification,
  clearNotification,
} from "../reducers/notificationReducer";

export const setNotificationWithTimeout = (dispatch, message) => {
  dispatch(createDisplayNotification(message));
  setTimeout(() => dispatch(clearNotification()), 5000);
};
