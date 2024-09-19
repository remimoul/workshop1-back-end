import { Controller, Get, Param, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import { Response } from 'express';
import { join } from 'path';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get(':imageName')
  renderImageFromUploads(
    @Param('imageName') imageName: string,
    @Res() res: Response,
  ) {
    const imagePath = this.imageService.renderImageFromUploads(imageName);
    return res.sendFile(imagePath);
  }

  @Get('/back/:imageName')
  renderImageFromGBCBackFolder(
    @Param('imageName') imageName: string,
    @Res() res: Response,
  ) {
    const imagePath = this.imageService.renderImageFromGBCBackFolder(imageName);
    return res.sendFile(imagePath);
  }

  @Get('back/stickers/all')
  getStickerUrlFromGBCBackFolder(@Res() res: Response) {
    const images = this.imageService.getStickerUrlFromGBCBackFolder();
    return res.json(images);
  }

  @Get('back/strap/all')
  getStrapUrlFromGBCBackFolder(@Res() res: Response) {
    const images = this.imageService.getStrapUrlFromGBCBackFolder();
    return res.json(images);
  }
}
