import type { ToastOptions, } from "react-toastify";
import { toast as toastObject } from "react-toastify";

export const toast = {
  success: (msg: string, option?: ToastOptions) => toastObject.success(msg, option),
  error: (msg: string, option?: ToastOptions) => toastObject.error(msg, option),
  info: (msg: string, option?: ToastOptions) => toastObject.info(msg, option),
  warning: (msg: string, option?: ToastOptions) => toastObject.warn(msg, option),
};