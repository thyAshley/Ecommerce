import React from "react";
import { Alert, AlertProps } from "react-bootstrap";

const Message: React.FC<AlertProps> = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
