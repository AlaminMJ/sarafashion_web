"use client";

import { useState } from "react";
import { ForgotPasswordForm } from "@/components/form/forgot-password-form";
import { OtpVerificationForm } from "@/components/form/otp-verification-form";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center  p-4">
      {!isOtpSent ? (
        <ForgotPasswordForm
          onOtpSent={(email) => {
            setEmail(email);
            setIsOtpSent(true);
          }}
        />
      ) : (
        <OtpVerificationForm email={email} />
      )}
    </div>
  );
}
