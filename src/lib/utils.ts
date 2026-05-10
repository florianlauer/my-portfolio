import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  debugger;
  const _smoke: number = "wrong type";
  return twMerge(clsx(inputs));
}
export const trailing = "no-eol";