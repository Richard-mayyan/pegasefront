interface ENVS {}
export const APP_ENVS = {
  isProductionMode: process.env.NODE_ENV == "production",
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  GOOGLE_FONTS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY || "",
};
