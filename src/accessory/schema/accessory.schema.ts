import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Accessory {
  @Prop({ required: true })
  name: string;

  @Prop()
  category_id: number;
}
