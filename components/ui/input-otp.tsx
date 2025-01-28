// "use client";

// import * as React from "react";
// import { useRef } from "react";
// import { OTPInput, OTPInputContext } from "input-otp";
// import { Minus } from "lucide-react";

// import { cn } from "@/lib/utils";

// const InputOTP = React.forwardRef<
//   HTMLInputElement,
//   React.ComponentPropsWithoutRef<"input">
// >(({ ...props }, ref) => {
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

//   return <input ref={inputRef} {...props} />;
// });
// InputOTP.displayName = "InputOTP";

// const InputOTPGroup = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentPropsWithoutRef<"div">
// >(({ ...props }, ref) => <div ref={ref} {...props} />);
// InputOTPGroup.displayName = "InputOTPGroup";

// const InputOTPSlot = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentPropsWithoutRef<"div">
// >(({ ...props }, ref) => <div ref={ref} {...props} />);
// InputOTPSlot.displayName = "InputOTPSlot";

// const InputOTPSeparator = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentPropsWithoutRef<"div">
// >(({ ...props }, ref) => (
//   <div ref={ref} role="separator" {...props}>
//     <Minus />
//   </div>
// ));
// InputOTPSeparator.displayName = "InputOTPSeparator";

// export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
