import { AxiosError } from "axios";
import { toast } from "sonner";

export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE";
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: "Relevance",
  slug: null,
  sortKey: "RELEVANCE",
  reverse: false,
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: "Trending",
    slug: "trending-desc",
    sortKey: "BEST_SELLING",
    reverse: false,
  }, // asc
  {
    title: "Latest arrivals",
    slug: "latest-desc",
    sortKey: "CREATED_AT",
    reverse: true,
  },
  {
    title: "Price: Low to high",
    slug: "price-asc",
    sortKey: "PRICE",
    reverse: false,
  }, // asc
  {
    title: "Price: High to low",
    slug: "price-desc",
    sortKey: "PRICE",
    reverse: true,
  },
];

export const TAGS = {
  collections: "collections",
  products: "products",
  cart: "cart",
};

export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";
export const DEFAULT_OPTION = "Default Title";
export const SHOPIFY_GRAPHQL_API_ENDPOINT = "/api/2023-01/graphql.json";

// export const IMG_URL =
//   "https://images.pexels.com/photos/6923373/pexels-photo-6923373.jpeg";

export const IMG_URL = "https://placehold.co/600x400?text=Image";
export const getPlaceholderImage = (text: string) =>
  `https://placehold.co/600x400?text=${text}`;

export const IMG_URL2 =
  "https://images.pexels.com/photos/1007018/pexels-photo-1007018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
export const IMG_URL_MODEL =
  "https://images.pexels.com/photos/1805411/pexels-photo-1805411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

// Global typography options to reuse across Select components
// value should match your CSS/font loading keys (e.g., Tailwind font-family or loaded webfonts)
export const TYPOGRAPHY_OPTIONS = [
  { label: "Inter", value: "inter" },
  { label: "Manrope", value: "manrope" },
  { label: "Roboto", value: "roboto" },
  { label: "Poppins", value: "poppins" },
  { label: "Lato", value: "lato" },
  { label: "Montserrat", value: "montserrat" },
  { label: "Open Sans", value: "open-sans" },
  { label: "Raleway", value: "raleway" },
  { label: "Nunito", value: "nunito" },
  { label: "Work Sans", value: "work-sans" },
  { label: "Playfair Display", value: "playfair-display" },
  { label: "Merriweather", value: "merriweather" },
  { label: "Source Serif Pro", value: "source-serif-pro" },
];

const ROUTES = {
  createModule: "/p/modules/create",
  student: {
    home: "/stud",
  },
  coach: {
    home: "/coach",
  },
  admin: {
    home: "/admin",
  },
  onboarding0: "/onboarding/0",
  onboarding1: "/onboarding/1",
  onboarding2: "/onboarding/2",
  onboarding3: "/onboarding/3",
  onboarding4: "/onboarding/4",
  onboarding5: "/onboarding/5",

  selectPlan: "/select-plan",

  connection: "/connection/1",
  forgotPassword: "/connection/2",
  resetPassword: "/connection/3",
  resetPasswordSuccess: "/connection/3",
  resetPasswordSubmission: "/connection/reset-password-submission",
  options: "/p/profile/1",
  coachProfile: "/p/profile",
  myCommunity: "/p/communaute/1",
  goToMyCommunity: (id: string) => `/p/communaute/${id}`,
  membres: "/p/membres/1",
  modules: "/p/modules/2",
  chat: "/p/chat/2",
  createCommunity: "/onboarding/1",
  createCommunitySuccess: "/onboarding/5",
  codeSent: "/inscriptions/2",
  accountConfirmed: "/inscriptions/3",
  coachings: "/p/mescoachings/1",
  login: "/login",
  home: "/",
  calendrier: "/p/calendrier/1",
  register: "/inscriptions/1",
  members: "/admin/members",
  subscriptions: "/admin/subscriptions",
};

const manDefaultPP =
  "https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg";
const womanDefaultPP =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN50r5wY4R7H5R2AMZ2ZpcsnNbx7YlcrKtpA&s";

export const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";
export { ROUTES, manDefaultPP, womanDefaultPP };

export const handleApiError = (error: AxiosError<any>) => {
  console.log("handleApiError ", error);
  const message =
    (error.response?.data as any)?.message || "Erreur de connexion";
  toast.error(message);
};

export const sendUserToCodeSent = (email: string) => {
  const encodedEmail = encodeURIComponent(email);
  window.location.href = `${ROUTES.codeSent}?email=${encodedEmail}`;
};

const membersIcons = {
  aventuries: "/membersimg/aventuries.svg",
  champions: "/membersimg/champions.svg",
  maitres: "/membersimg/maitres.svg",
  explorateurs: "/membersimg/explorateurs.svg",
};

export { membersIcons };
