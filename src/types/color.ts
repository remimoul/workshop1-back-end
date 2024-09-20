import { Image } from './image';

export interface ColorType {
  id: number;
  name: string;
  hexcode: string;
  price: number;
  images: Image[];
  isTransparent?: boolean;
  isDefault?: boolean | false;
}
