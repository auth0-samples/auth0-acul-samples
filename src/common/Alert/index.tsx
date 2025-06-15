import React from "react";
import Icon from "@/common/Icon";
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
  const baseStyles = ["p-4 rounded-widget my-4 border", "text-body font-body"];

  const typeStyles = {
    error: "bg-error border-error text-primary-button-label",
    warning: "bg-warning border-warning text-body-text",
    success: "bg-success border-success text-primary-button-label",
    info: "bg-info border-info text-primary-button-label",
  };

  const selectedTypeStyles = typeStyles[type] || typeStyles.info;
  const messages = Array.isArray(message) ? message : [message];

  const IconComponent: React.ElementType | null = null;

  return (
    <div className={cn(baseStyles, selectedTypeStyles, className)} role="alert">
      <div className="flex">
        {IconComponent && (
          <div className="flex-shrink-0">
            <Icon As={IconComponent} className="h-5 w-5" title={type} />
          </div>
        )}
        <div className={cn("ml-3 flex-1", !IconComponent && "ml-0")}>
          {title && <h3 className="text-subtitle font-subtitle">{title}</h3>}
          <div className={cn("text-body", title && "mt-2")}>
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
