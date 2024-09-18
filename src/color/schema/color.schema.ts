import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Attribute } from 'src/types/attribute';

@Schema()
export class Color {
  @Prop({ required: true })
  name: string;

  @Prop()
  code: string;

  @Prop({ type: [Object], required: true })
  option: Attribute[];
}

/**
 * @description: permet d'avoir un typage précis entre Mongoose et TS,
 * octroie les méthodes mongoose à l'objet Product
 */
export type ColorDocument = HydratedDocument<Color>;
/**
 * @param: Class
 * @description: prend la classe TS avec le décorateur '@Schema()' et ses propriétés avec le décorateur '@prop()'
 * @returns Un schéma Mongoose qui peut être utilisé pour créer un modèle ou être configuré davantage
 */
export const ColorSchema = SchemaFactory.createForClass(Color);
