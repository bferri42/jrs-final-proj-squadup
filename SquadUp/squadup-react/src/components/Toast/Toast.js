import React, { useEffect } from "react";
import "./Toast.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faInfoCircle,
  faExclamationTriangle,
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function Toast({
  id,
  severity,
  summary,
  detail,
  isLingering,
  removeToast,
}) {
  let icon;
  if (severity == "success") {
    icon = faCircleCheck;
  } else if (severity == "error") {
    icon = faCircleXmark;
  } else if (severity == "warning") {
    icon = faExclamationTriangle;
  } else if (severity == "info") {
    icon = faInfoCircle;
  }

  useEffect(() => {
    if (!isLingering) {
      setTimeout(() => {
        removeToast(id);
      }, 4000);
    }
  }, []);

  return (
    <div className={`toast-root  + ${severity}`}>
      <div className="icon">
        <FontAwesomeIcon size="2x" icon={icon} />
      </div>
      <div className="message">
        <h4 className="summary">{summary || severity}</h4>
        <span className="detail">{detail}</span>
      </div>
      <div
        className="x-button"
        onClick={() => {
          removeToast(id);
        }}
      >
        <FontAwesomeIcon icon={faTimes} />
      </div>
    </div>
  );
}
