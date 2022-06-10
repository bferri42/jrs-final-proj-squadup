import React, { createContext, useContext, useState } from "react";
import Toast from "./Toast";

const ToastContext = createContext();
var id = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function removeToast(id) {
    setToasts(toasts => {
        return toasts.filter((t) => t.id !== id)
    });
  }

  return (
    <ToastContext.Provider value={{ toasts, setToasts }}>
      <ToastMessenger removeToast={removeToast} toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
}

export function useToasts() {
  const { toasts, setToasts } = useContext(ToastContext);

  function addToast(detail, summary, severity, isLingering) {
    //add a {toast} to the array
    let newToast = {
      id: id++,
      detail,
      summary,
      severity,
      isLingering,
    };
    setToasts(toasts => {
        return [...toasts, newToast]
    });
  }

  return {
    success: (detail, summary) => {
      let severity = "success";
      addToast(detail, summary, severity);
    },
    error: (detail, summary) => {
      let severity = "error";
      addToast(detail, summary, severity);
    },
    warning: (detail, summary) => {
      let severity = "warning";
      addToast(detail, summary, severity);
    },
    info: (detail, summary) => {
      let severity = "info";
      addToast(detail, summary, severity);
    },
    add: (detail, summary, severity, isLingering) => {
      addToast(detail, summary, severity || "success", isLingering);
    },
    clear: () => {
      setToasts([]);
    },
  };
}

function ToastMessenger({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts?.map((toast, i) => (
        <Toast key={toast.id} {...toast} removeToast={removeToast} />
      ))}
    </div>
  );
}
export default ToastMessenger;
