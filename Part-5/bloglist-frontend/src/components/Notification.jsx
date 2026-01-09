const Notification = ({ message }) => {
  return (
    <div className={message.class}>
      <p>{message.message}</p>
    </div>
  );
};

export default Notification;
