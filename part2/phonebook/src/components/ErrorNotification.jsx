const style = {
  color: "red",
  border: "1px solid red",
  background: "lightgrey",
};

const ErrorNotification = ({ errorMsg }) => {
  return <div style={style}>{errorMsg}</div>;
};

export default ErrorNotification;
