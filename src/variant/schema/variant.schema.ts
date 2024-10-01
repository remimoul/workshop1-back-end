import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Image } from 'src/types/image';

@Schema()
export class Variant {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  accessory_id: string;

  @Prop()
  name: string;

  @Prop()
  hexcode: string;

  @Prop()
  images: Image[];

  @Prop({ required: false, default: false })
  isTransparent?: boolean;

  @Prop()
  isDefault: boolean;

  @Prop({ required: false, default: 0 })
  price?: number;
}

export type VariantDocument = HydratedDocument<Variant>;

export const VariantSchema = SchemaFactory.createForClass(Variant);
