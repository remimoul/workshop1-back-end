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

  @Get('/front/:imageName')
  renderImageFromGBCFrontFolder(
    @Param('imageName') imageName: string,
    @Res() res: Response,
  ) {
    const imagePath =
      this.imageService.renderImageFromGBCFrontFolder(imageName);
    return res.sendFile(imagePath);
  }

  @Get('front/ips/all')
  getIpsUrlFromGBCFrontFolder(@Res() res: Response) {
    const images = this.imageService.getIpsUrlFromGBCFrontFolder();
    return res.json(images);
  }

  @Get('front/strap/all')
  getStrapUrlFromGBCFrontFolder(@Res() res: Response) {
    const images = this.imageService.getStrapUrlFromGBCFrontFolder();
    return res.json(images);
  }

  @Get('front/btn/all')
  getBtnpUrlFromGBCFrontFolder(@Res() res: Response) {
    const images = this.imageService.getBtnpUrlFromGBCFrontFolder();
    return res.json(images);
  }

  @Get('front/pads/all')
  getPadspUrlFromGBCFrontFolder(@Res() res: Response) {
    const images = this.imageService.getPadspUrlFromGBCFrontFolder();
    return res.json(images);
  }

  @Get('front/shell/all')
  getShellpUrlFromGBCFrontFolder(@Res() res: Response) {
    const images = this.imageService.getShellpUrlFromGBCFrontFolder();
    return res.json(images);
  }

  @Get('front/battery/all')
  getBatterypUrlFromGBCFrontFolder(@Res() res: Response) {
    const images = this.imageService.getBatterypUrlFromGBCFrontFolder();
    return res.json(images);
  }

  @Get('front/power/all')
  getPowerpUrlFromGBCFrontFolder(@Res() res: Response) {
    const images = this.imageService.getPowerpUrlFromGBCFrontFolder();
    return res.json(images);
  }
}
