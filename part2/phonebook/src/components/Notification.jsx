const Notification = ({ message }) => {
  const style = {
    fontSize: 20,
    color: 'green',
    background: 'lightgrey',
    padding: 10,
    borderRadius: 5,
    borderStyle: 'solid',
    marginBottom: 20,
  };

  if (message === null) return;

  return <div style={style}>{message}</div>;
};

export default Notification;
