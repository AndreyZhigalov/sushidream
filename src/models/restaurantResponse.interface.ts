import { RestaurantItem } from "./restaurantItem.interface";

export type RestaurantResponse = { addresses: Record<string, RestaurantItem> }