import React, { useState } from "react";
import { useEffect } from "react";
type ToasterVariant = "success" | "error";

const toasterClasses: Record<ToasterVariant, string> = {
  success: "bg-green-200/90 text-green-700",
  error: "bg-red-200/90 text-red-700",
};

const toasterMessage: Record<ToasterVariant, string> = {
  success: "Settings were changed successfully",
  error: "Error: Settings were not saved. Check the input in the form",
};

interface ToasterProps {
  duration?: number;
  visible?: boolean;
  variant: ToasterVariant;
}

const Toaster: React.FC<ToasterProps> = ({
  duration = 3000,
  visible = false,
  variant,
}) => {
  const [open, setOpen] = useState(visible);

  useEffect(() => {
    setOpen(visible);
  }, [visible]);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      setOpen(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [open, duration]);

  if (!open) return null;
  return (
    <div
      id="toast-default"
      className={`${toasterClasses[variant]} fixed bottom-4 right-3 border rounded-sm flex items-center w-full max-w-xs p-4 text-body rounded-base shadow-xs `}
      role="alert"
    >
      <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-fg-success bg-success-soft rounded">
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 11.917 9.724 16.5 19 7.5"
          />
        </svg>
        <span className="sr-only">Check icon</span>
      </div>
      <div className="ms-2.5 text-sm ps-3.5">{toasterMessage[variant]}</div>
    </div>
  );
};

export default Toaster;
