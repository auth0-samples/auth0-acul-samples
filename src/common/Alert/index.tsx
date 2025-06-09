import React from "react";
import Icon from "@/common/Icon";
import { ExclamationCircleIcon } from "@/assets/icons";
import { cn } from "@/utils/helpers/cn";

export interface ErrorMessage {
  message: string;
}

export interface AlertProps {
  type: "error" | "warning" | "success" | "info";
  message: string | ErrorMessage | (string | ErrorMessage)[];
  className?: string;
  title?: string;
}

const Alert = ({ type, message, className, title }: AlertProps) => {
  const baseStyles = "p-4 rounded-md my-4";
  let typeStyles = "";
  let IconComponent: React.ElementType | null = null;

  switch (type) {
    case "error":
      typeStyles = "bg-error/10 border border-error text-error";
      IconComponent = ExclamationCircleIcon;
      break;
    case "warning":
      typeStyles = "bg-warning/20 border border-warning text-warning";
      break;
    case "success":
      typeStyles = "bg-success/10 border border-success text-success";
      break;
    case "info":
      typeStyles = "bg-primary/10 border border-primary text-primary";
      break;
    default:
      typeStyles = "bg-gray-mid/10 border border-gray-mid text-text-default";
  }

  const messages = Array.isArray(message) ? message : [message];

  return (
    <div className={cn(baseStyles, typeStyles, className)} role="alert">
      <div className="flex">
        {IconComponent && (
          <div className="flex-shrink-0">
            <Icon As={IconComponent} className="h-5 w-5" title={type} />
          </div>
        )}
        <div className={cn("ml-3 flex-1", !IconComponent && "ml-0")}>
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <div className={cn("text-sm", title && "mt-2")}>
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
