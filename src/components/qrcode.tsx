"use client";

import { type HTMLAttributes, useEffect, useState } from "react";

import { cva, type VariantProps } from "class-variance-authority";
import QR from "qrcode";

import { cn } from "@/lib/utils";

const qrcodeVariants = cva("", {
  variants: {
    size: {
      xs: "size-16",
      sm: "size-24",
      default: "size-32",
      lg: "size-48",
      xl: "size-64",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface QRCodeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof qrcodeVariants> {
  data: string;
  foreground?: string;
  background?: string;
  robustness?: "L" | "M" | "Q" | "H";
}

export const QRCode = ({
  data,
  foreground,
  background,
  robustness = "M",
  size,
  className,
  ...props
}: QRCodeProps) => {
  const [svg, setSVG] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateQR = async () => {
      try {
        setError(null);

        const foregroundColor = foreground ?? "#000000";
        const backgroundColor = background ?? "#ffffff";

        const newSvg = await QR.toString(data, {
          type: "svg",
          color: {
            dark: foregroundColor,
            light: backgroundColor,
          },
          width: 200,
          errorCorrectionLevel: robustness,
          margin: 0,
        });

        setSVG(newSvg);
      } catch (err) {
        console.error("QR Code generation error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to generate QR code"
        );
      }
    };

    if (data) {
      generateQR();
    }
  }, [data, foreground, background, robustness]);

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center p-4 text-red-500",
          qrcodeVariants({ size }),
          className
        )}
      >
        Error: {error}
      </div>
    );
  }

  if (!svg) {
    return (
      <div
        className={cn(
          "flex items-center justify-center p-4 text-gray-500",
          qrcodeVariants({ size }),
          className
        )}
      >
        Loading QR code...
      </div>
    );
  }

  return (
    <div
      className={cn(
        "size-full",
        "[&_svg]:size-full",
        qrcodeVariants({ size }),
        className
      )}
      dangerouslySetInnerHTML={{ __html: svg }}
      {...props}
    />
  );
};

export { qrcodeVariants };
