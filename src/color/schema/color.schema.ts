import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Color {
  @Prop({ required: true })
  name: string;

  @Prop()
  code: string;

  @Prop({ type: [Attribute], required: true })
  option: string;
}
