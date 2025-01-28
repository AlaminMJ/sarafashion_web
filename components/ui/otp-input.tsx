"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface OtpInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  length?: number;
  onComplete?: (otp: string) => void;
}

export const OtpInput = React.forwardRef<HTMLInputElement, OtpInputProps>(
  ({ className, length = 6, onComplete, ...props }, ref) => {
    const [otp, setOtp] = React.useState<string[]>(new Array(length).fill(""));
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    React.useEffect(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, []);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
    ) => {
      const value = e.target.value;
      if (isNaN(Number(value))) return;

      const newOtp = [...otp];
      newOtp[index] = value.substring(value.length - 1);
      setOtp(newOtp);

      const otpValue = newOtp.join("");
      if (otpValue.length === length && onComplete) {
        onComplete(otpValue);
      }

      // Move to next input if current field is filled
      if (value && index < length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number
    ) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        // Move to previous input on backspace
        inputRefs.current[index - 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text/plain").slice(0, length);
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        if (i < length && !isNaN(Number(pastedData[i]))) {
          newOtp[i] = pastedData[i];
        }
      }
      setOtp(newOtp);
      if (newOtp.join("").length === length && onComplete) {
        onComplete(newOtp.join(""));
      }
    };

    return (
      <div className={cn("flex gap-2", className)}>
        {otp.map((digit, index) => (
          <Input
            key={index}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            // ref={(el) => (inputRefs.current[index] = el)}
            className="w-10 h-10 text-center"
            {...props}
          />
        ))}
      </div>
    );
  }
);
OtpInput.displayName = "OtpInput";
