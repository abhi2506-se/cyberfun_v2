import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric", month: "short", day: "numeric"
  }).format(new Date(date));
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}

export const COMPANY = {
  name:     "Cyberfun Software Services",
  fullName: "Cyberfun Software Services Private Limited",
  tagline:  "Building Future-Ready Digital Solutions",
  email:    "hello@cyberfunsoftware.com",
  phone:    "+91 98765 43210",
  address:  "4th Floor, Tech Tower, Connaught Place, New Delhi – 110001",
  social: {
    linkedin:  "https://linkedin.com/company/cyberfun-software",
    twitter:   "https://twitter.com/cyberfunsw",
    github:    "https://github.com/cyberfun-software",
    instagram: "https://instagram.com/cyberfunsoftware",
  },
};
