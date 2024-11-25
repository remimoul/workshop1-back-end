import { Module } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantController } from './variant.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Variant, VariantSchema } from './schema/variant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Variant.name, schema: VariantSchema }]),
  ],
  controllers: [VariantController],
  providers: [VariantService],
  exports: [VariantService],
})
export class VariantModule {}
