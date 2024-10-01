export interface AddToCartPayload {
  category_id: number;
  applyDiscount: boolean;
  options: {
    accessoryId: string;
    variantId: number;
  }[];
}
