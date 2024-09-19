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

  getBatteryUrlFromGBCBackFolder(): string[] {
    const uploadsDir = join(process.cwd(), 'assets/GBC/BACK');
    const files = readdirSync(uploadsDir);
    return files.filter((file) => file.includes('BATTERY'));
  }

  /**
   * @description: renvoie une image depuis le dossier assets/GBC/FRONT grâce à son nom
   * @param imageName
   * @returns : une image
   */
  renderImageFromGBCFrontFolder(imageName: string): string {
    return join(process.cwd(), 'assets/GBC/FRONT', imageName);
  }

  getIpsUrlFromGBCFrontFolder(): string[] {
    const uploadsDir = join(process.cwd(), 'assets/GBC/FRONT');
    const files = readdirSync(uploadsDir);
    return files.filter((file) => file.includes('IPS'));
  }

  getStrapUrlFromGBCFrontFolder(): string[] {
    const uploadsDir = join(process.cwd(), 'assets/GBC/FRONT');
    const files = readdirSync(uploadsDir);
    return files.filter((file) => file.includes('Strap'));
  }

  getBtnpUrlFromGBCFrontFolder(): string[] {
    const uploadsDir = join(process.cwd(), 'assets/GBC/FRONT');
    const files = readdirSync(uploadsDir);
    return files.filter((file) => file.includes('BOUTONS'));
  }

  getPadspUrlFromGBCFrontFolder(): string[] {
    const uploadsDir = join(process.cwd(), 'assets/GBC/FRONT');
    const files = readdirSync(uploadsDir);
    return files.filter((file) => file.includes('PADS'));
  }

  getShellpUrlFromGBCFrontFolder(): string[] {
    const uploadsDir = join(process.cwd(), 'assets/GBC/FRONT');
    const files = readdirSync(uploadsDir);
    return files.filter((file) => file.includes('SHELL'));
  }

  getBatterypUrlFromGBCFrontFolder(): string[] {
    const uploadsDir = join(process.cwd(), 'assets/GBC/FRONT');
    const files = readdirSync(uploadsDir);
    return files.filter((file) => file.includes('BATTERY'));
  }

  getPowerpUrlFromGBCFrontFolder(): string[] {
    const uploadsDir = join(process.cwd(), 'assets/GBC/FRONT');
    const files = readdirSync(uploadsDir);
    return files.filter((file) => file.includes('BATTERY'));
  }

  /**
   * @description: renvoie une image depuis le dossier assets/GBC/SIDE grâce à son nom
   * @param imageName
   * @returns : une image
   */
  renderImageFromGBCSideFolder(imageName: string): string {
    return join(process.cwd(), 'assets/GBC/SIDE', imageName);
  }

  getIpsUrlFromGBCSideFolder(): string[] {
    const uploadsDir = join(process.cwd(), 'assets/GBC/SIDE');
    const files = readdirSync(uploadsDir);
    return files.filter((file) => file.includes('IPS'));
  }

  getStrapUrlFromGBCSideFolder(): string[] {
    const uploadsDir = join(process.cwd(), 'assets/GBC/SIDE');
    const files = readdirSync(uploadsDir);
    return files.filter((file) => file.includes('Strap'));
  }

  getBtnpUrlFromGBCSideFolder(): string[] {
    const uploadsDir = join(process.cwd(), 'assets/GBC/SIDE');
    const files = readdirSync(uploadsDir);
    return files.filter((file) => file.includes('BOUTONS'));
  }

  getPadspUrlFromGBCSideFolder(): string[] {
    const uploadsDir = join(process.cwd(), 'assets/GBC/SIDE');
    const files = readdirSync(uploadsDir);
    return files.filter((file) => file.includes('PADS'));
  }

  getShellpUrlFromGBCSideFolder(): string[] {
    const uploadsDir = join(process.cwd(), 'assets/GBC/SIDE');
    const files = readdirSync(uploadsDir);
    return files.filter((file) => file.includes('SHELL'));
  }

  getBatterypUrlFromGBCSideFolder(): string[] {
    const uploadsDir = join(process.cwd(), 'assets/GBC/SIDE');
    const files = readdirSync(uploadsDir);
    return files.filter((file) => file.includes('BATTERY'));
  }

  getLedpUrlFromGBCSideFolder(): string[] {
    const uploadsDir = join(process.cwd(), 'assets/GBC/SIDE');
    const files = readdirSync(uploadsDir);
    return files.filter((file) => file.includes('LED'));
  }
}
