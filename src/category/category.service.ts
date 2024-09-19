import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private CategoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name } = createCategoryDto;

    const category = await this.CategoryModel.findOne({ name });

    if (category) {
      throw new ConflictException(`Category ${name} already exists`);
    }

    const newCategory = new this.CategoryModel(createCategoryDto);
    return newCategory.save();
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.CategoryModel.find();

    if (!categories) {
      throw new NotFoundException(`No categories found`);
    }

    return categories;
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.CategoryModel.findById(id);

    if (!category)
      throw new NotFoundException(`No category found with the id ${id}`);

    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.CategoryModel.find({ id });

    if (!category)
      throw new NotFoundException(`No category found with the id ${id}`);

    const updatedCategory = await this.CategoryModel.findOneAndUpdate(
      { id },
      updateCategoryDto,
      { new: true },
    );

    return updatedCategory;
  }

  async remove(id: number): Promise<Category> {
    const category = await this.CategoryModel.findById(id);

    if (!category)
      throw new NotFoundException(`No category found with the id ${id}`);
    const deletedCategory = await this.CategoryModel.findByIdAndDelete(id);

    return deletedCategory;
  }
}
