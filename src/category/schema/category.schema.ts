import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Category {
  @Prop({ type: Number })
  id: number;

  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  price: number;

  @Prop()
  deviceDiscount: number;
}

/**
 * @description: permet d'avoir un typage précis entre Mongoose et TS,
 * octroie les méthodes mongoose à l'objet Product
 */
export type CategoryDocument = HydratedDocument<Category>;

/**
 * @param: Class
 * @description: prend la classe TS avec le décorateur '@Schema()' et ses propriétés avec le décorateur '@prop()'
 * @returns Un schéma Mongoose qui peut être utilisé pour créer un modèle ou être configuré davantage
 */
export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.index({ id: 1 }, { unique: true });
