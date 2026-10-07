const Notification = ({ notification }) => {
  if (!notification) return null;

  const { message, success } = notification;

  const style = {
    fontSize: 20,
    background: 'lightgrey',
    padding: 10,
    borderRadius: 5,
    borderStyle: 'solid',
    marginBottom: 20,
  };

  const successStyle = { ...style, color: 'green' };
  const errorStyle = { ...style, color: 'red' };

  return <div style={success ? successStyle : errorStyle}>{message}</div>;
};

export default Notification;
