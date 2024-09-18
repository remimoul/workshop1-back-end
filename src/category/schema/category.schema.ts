import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Category {
  @Prop({ type: Number, required: true, unique: true })
  id: number;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  discount: number;
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
