import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { readdirSync } from 'fs';

@Injectable()
export class ImageService {
  ///////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////// TODO: REFACTO/////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////

  /**
   * @description: renvoie une image depuis le dossier uploads grâce à son nom
   * @param imageName
   * @returns : une image
   */
  renderImageFromUploads(imageName: string): string {
    return join(process.cwd(), 'uploads', imageName);
  }

  /**
   * @description: renvoie une image depuis le dossier assets/GBC/BACK grâce à son nom
   * @param imageName
   * @returns : une image
   */
  renderImageFromGBCBackFolder(imageName: string): string {
    return join(process.cwd(), 'assets/GBC/BACK', imageName);
  }

  getStickerUrlFromGBCBackFolder(): string[] {
    const uploadsDir = join(process.cwd(), 'assets/GBC/BACK');
    const files = readdirSync(uploadsDir);
    return files.filter((file) => file.includes('STICKER'));
  }

  getStrapUrlFromGBCBackFolder(): string[] {
    const uploadsDir = join(process.cwd(), 'assets/GBC/BACK');
    const files = readdirSync(uploadsDir);
    return files.filter((file) => file.includes('Strap'));
  }
}
