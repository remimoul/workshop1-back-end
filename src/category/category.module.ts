import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import {
  Category,
  CategorySchema,
  CategoryDocument,
} from './schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule implements NestModule {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    CategorySchema.pre<CategoryDocument>('save', async function (next) {
      if (this.isNew) {
        const maxCategory = await this.model('Category')
          .findOne({}, { id: 1 })
          .sort({ id: -1 })
          .exec();
        this.id = maxCategory ? maxCategory.id + 1 : 1;
      }
      next();
    });
  }
}
