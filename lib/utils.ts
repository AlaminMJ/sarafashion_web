import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToDDMMYY(timestamp: string) {
  const date = new Date(timestamp);

  // Get the date components
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 because months are 0-based
  const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

  // Get the time components
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Format as DD/MM/YY HH:mm
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
