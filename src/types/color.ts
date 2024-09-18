import { Image } from './image';
export interface ColorType {
  name: string;
  hexcode: string;
  images: Image[];
  isTransparent: boolean;
}
