import React from "react";
import Icon from "@/common/Icon";
import { ExclamationCircleIcon } from "@/assets/icons";

export interface ErrorMessage {
  message: string;
}

export interface AlertProps {
  type: "error" | "warning" | "success" | "info";
  message: string | ErrorMessage | (string | ErrorMessage)[];
  className?: string;
  title?: string;
}

const Alert: React.FC<AlertProps> = ({ type, message, className, title }) => {
  const baseStyles = "p-4 rounded-md my-4";
  let typeStyles = "";
  let IconComponent: React.ElementType | null = null;

  switch (type) {
    case "error":
      typeStyles = "bg-error/10 border border-error text-error";
      IconComponent = ExclamationCircleIcon;
      break;
    case "warning":
      typeStyles = "bg-warning/20 border border-warning text-warning"; // Ensure --color-warning is effective here or use specific Tailwind yellow
      // IconComponent = WarningIcon; // TODO: Create WarningIcon and import
      break;
    case "success":
      typeStyles = "bg-success/10 border border-success text-success";
      // IconComponent = SuccessIcon; // TODO: Create SuccessIcon and import
      break;
    case "info":
      typeStyles = "bg-primary/10 border border-primary text-primary";
      // IconComponent = InfoIcon; // TODO: Create InfoIcon and import
      break;
    default:
      typeStyles = "bg-gray-mid/10 border border-gray-mid text-text-default"; // Tailwind gray, not from theme
  }

  const messages = Array.isArray(message) ? message : [message];

  return (
    <div
      className={`${baseStyles} ${typeStyles} ${className || ""}`}
      role="alert"
    >
      <div className="flex">
        {IconComponent && (
          <div className="flex-shrink-0">
            <Icon As={IconComponent} className="h-5 w-5" title={type} />
          </div>
        )}
        <div className={`ml-3 flex-1 ${IconComponent ? "" : "ml-0"}`}>
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <div className={`text-sm ${title ? "mt-2" : ""}`}>
            {messages.length === 1 ? (
              <p>
                {typeof messages[0] === "string"
                  ? messages[0]
                  : messages[0].message}
              </p>
            ) : (
              <ul className="list-disc pl-5 space-y-1">
                {messages.map((msg, index) => (
                  <li key={index}>
                    {typeof msg === "string" ? msg : msg.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
