import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Category } from 'src/types/category';

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  type: string;

  @Prop()
  description: string;

  @Prop()
  short_description: string;

  @Prop([Object])
  categories: Category[];
}

/**
 * @description: permet d'avoir un typage précis entre Mongoose et TS,
 * octroie les méthodes mongoose à l'objet Product
 */
export type ProductDocument = HydratedDocument<Product>;

/**
 * @param: Class
 * @description: prend la classe TS avec le décorateur '@Schema()' et ses propriétés avec le décourateur '@prop()'
 * @returns Un schéma Mongoose qui peut être utilisé pour créer un modèle ou être configuré davantage
 */
export const ProductSchema = SchemaFactory.createForClass(Product);
