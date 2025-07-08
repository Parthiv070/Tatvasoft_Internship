import { environment } from "../../../environments/environment";

export const API_BASE_URL = environment.apiBaseUrl;
export const IMAGE_BASE_URL = environment.apiBaseUrl;

export const APP_CONFIG = {
  apiBaseUrl: `${API_BASE_URL}/api`,  // ✅ /api added here only
  imageBaseUrl: IMAGE_BASE_URL,
  tokenKey: "access_Token",
  defaultPageSize: 10,
  toastDuration: 3000,
};
