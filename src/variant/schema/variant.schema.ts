import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Image } from 'src/types/image';

@Schema()
export class Variant {
  @Prop({ required: true })
  id: number;

  @Prop()
  name: string;

  @Prop()
  hexcode: string;

  @Prop([Image])
  images: Image[];

  @Prop({ required: false, default: false })
  isTransparent: boolean;

  @Prop()
  isDefault: boolean;

  @Prop({ required: false, default: 0 })
  price: number;
}

/**
 * @description: permet d'avoir un typage précis entre Mongoose et TS,
 * octroie les méthodes mongoose à l'objet Product
 */
export type VariantDocument = HydratedDocument<Variant>;

/**
 * @param: Class
 * @description: prend la classe TS avec le décorateur '@Schema()' et ses propriétés avec le décorateur '@prop()'
 * @returns Un schéma Mongoose qui peut être utilisé pour créer un modèle ou être configuré davantage
 */
export const VariantSchema = SchemaFactory.createForClass(Variant);
