import React from "react";
import { useNotification } from "./useNotification";

const NotificationProvider = () => {
  useNotification();
  return null;
};

export default NotificationProvider;
