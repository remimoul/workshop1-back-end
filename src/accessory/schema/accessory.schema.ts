import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from 'src/category/schema/category.schema';
import * as mongoose from 'mongoose';
import { ColorType } from 'src/types/color';

@Schema()
export class Accessory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Number })
  category_id: number;

  @Prop({ required: true })
  isBase: boolean;

  @Prop({ required: false })
  description: string;
}

/**
 * @description: permet d'avoir un typage précis entre Mongoose et TS,
 * octroie les méthodes mongoose à l'objet Product
 */
export type AccessoryDocument = HydratedDocument<Accessory>;

/**
 * @param: Class
 * @description: prend la classe TS avec le décorateur '@Schema()' et ses propriétés avec le décorateur '@prop()'
 * @returns Un schéma Mongoose qui peut être utilisé pour créer un modèle ou être configuré davantage
 */
export const AccessorySchema = SchemaFactory.createForClass(Accessory);
