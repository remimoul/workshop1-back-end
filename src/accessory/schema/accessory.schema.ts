import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from 'src/category/schema/category.schema';
import * as mongoose from 'mongoose';
import { ColorType } from 'src/types/color';

@Schema()
export class Accessory {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop([Object])
  color: ColorType[];
}
