interface ENVS {}

export const APP_ENVS = {
  isProductionMode: process.env.NODE_ENV == "production",
};
