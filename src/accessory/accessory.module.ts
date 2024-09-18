import { Module } from '@nestjs/common';
import { AccessoryService } from './accessory.service';
import { AccessoryController } from './accessory.controller';
import { Model } from 'mongoose';
import { MongooseModule, InjectModel } from '@nestjs/mongoose';
import { Accessory, AccessorySchema } from './schema/accessory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Accessory.name, schema: AccessorySchema },
    ]),
  ],
  controllers: [AccessoryController],
  providers: [AccessoryService],
})
export class AccessoryModule {}
