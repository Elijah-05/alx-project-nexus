// utils/cn.ts (or whatever name you like)
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function timeAgo(date : Date | string) {
  if (!date) return "";

  try {
    const then = new Date(date);
    const diff = Date.now() - then.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
    if (days < 7) {
      if (days === 1) return "1 day ago";
      return `${days} days ago`;
    }
    if (weeks < 5) {
      if (weeks === 1) return "1 week ago";
      return `${weeks} weeks ago`;
    }
    if (months < 12) {
      if (months === 1) return "1 month ago";
      return `${months} months ago`;
    }
    if (years === 1) return "1 year ago";

    return `${years} years ago`;
  } catch {
    return date.toString();
  }
}

export function lighten(hex: string, amount = 0.85) {
  const num = parseInt(hex.slice(1), 16);

  const r = Math.floor(((num >> 16) & 255) * amount + 255 * (1 - amount));
  const g = Math.floor(((num >> 8) & 255) * amount + 255 * (1 - amount));
  const b = Math.floor((num & 255) * amount + 255 * (1 - amount));

  return `rgb(${r}, ${g}, ${b})`;
}

export function randomHexColor() {
  const r = Math.floor(Math.random() * 180); // muted, not too bright
  const g = Math.floor(Math.random() * 180);
  const b = Math.floor(Math.random() * 180);

  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

// utils/moneyFormatter.ts

export function formatMoney(
  amount: number | string,
  currency: string = "USD",
  locale: string = "en-US",
  minimumFractionDigits: number = 0,
  maximumFractionDigits: number = 2
): string {
  const value = Number(amount);
  if (isNaN(value)) return "0";

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(value);
  } catch {
    // fallback if Intl breaks (invalid currency code)
    return `${currency} ${value.toFixed(maximumFractionDigits)}`;
  }
}
