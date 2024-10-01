import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
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
    const slug = slugify(name);
    newCategory.slug = slug;
    console.log(newCategory);

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
    const category = await this.CategoryModel.findOne({ id });

    if (!category)
      throw new NotFoundException(`No category found with the id ${id}`);

    return category;
  }

  async findOneBySlug(slug: string): Promise<Category> {
    const category = await this.CategoryModel.findOne({ slug });

    if (!category)
      throw new NotFoundException(`No category found with the slug ${slug}`);

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

    const slug = slugify(updatedCategory.name);
    updatedCategory.slug = slug;
    return updatedCategory.save();
  }

  async remove(id: number): Promise<Category> {
    const category = await this.CategoryModel.find({ id });

    if (!category)
      throw new NotFoundException(`No category found with the id ${id}`);
    const deletedCategory = await this.CategoryModel.findOneAndDelete({ id });

    return deletedCategory;
  }
}

export const slugify = (...args: (string | number)[]): string => {
  const value = args.join(' ');

  return value
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, '-'); // separator
};
