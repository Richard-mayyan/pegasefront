import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ReadonlyURLSearchParams } from "next/navigation";
import { APP_ENVS } from "@/logic/infra/config/envs";
import { User } from "@/logic/domain/entities/User";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

export const getdefaultValue = (value: any) => {
  return APP_ENVS.isProductionMode ? "" : value;
  // return "";
};

export function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function isEmptyObject(obj: any) {
  console.log("obj ", obj);
  return Object.keys(obj).length === 0;
}

export function getFullName(user: User) {
  return `${user.firstName} ${user.lastName}`;
}

export function formatPrice(value: number, locale = "us-US", currency = "$") {
  return `${value} ${currency}`;
  // return `$${value.toFixed(2)}`;
  // return new Intl.NumberFormat(locale, {
  //   style: "currency",
  //   currency: currency,
  //   minimumFractionDigits: 0,
  //   maximumFractionDigits: 0,
  // }).format(value);
}
