import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const diff = Math.abs(now.getTime() - createdAt.getTime());

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else if (minutes > 0) {
    return `${minutes} min ago`;
  } else {
    return `${seconds} sec ago`;
  }
};

export function formatNumber(number: number): string {
  let formattedNumber = number.toString();

  if (formattedNumber.length >= 7) {
    formattedNumber = (parseFloat(formattedNumber) / 1000000).toFixed(1) + "M";
  } else if (formattedNumber.length >= 4) {
    formattedNumber = (parseFloat(formattedNumber) / 1000).toFixed(1) + "K";
  }

  return formattedNumber;
}

export function getJoinedDate(date: Date): string {
  const month: string = date.toLocaleString("default", { month: "long" });
  const year: number = date.getFullYear();
  return `${month} ${year}`;
}
