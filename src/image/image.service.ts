import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class ImageService {
  getImagePath(imageName: string): string {
    return join(__dirname, '..', 'uploads', imageName);
  }
}
