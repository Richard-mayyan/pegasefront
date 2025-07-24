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

export const IMG_URL =
  "https://images.pexels.com/photos/6923373/pexels-photo-6923373.jpeg";
export const IMG_URL2 =
  "https://images.pexels.com/photos/1007018/pexels-photo-1007018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
export const IMG_URL_MODEL =
  "https://images.pexels.com/photos/1805411/pexels-photo-1805411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const ROUTES = {
  login: "/sign-in",
  home: "/",
  register: "/sign-up",
  members: "/admin/members",
  subscriptions: "/admin/subscriptions",
};

const manDefaultPP =
  "https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg";
const womanDefaultPP =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN50r5wY4R7H5R2AMZ2ZpcsnNbx7YlcrKtpA&s";

export { ROUTES, manDefaultPP, womanDefaultPP };
