import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schema/category.schema';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { slugify } from '../utils/constants';

describe('CategoryService', () => {
  let service: CategoryService;
  let model: Model<CategoryDocument>;

  const mockCategory: Category = {
    id: 1,
    name: 'PS Vita',
    slug: 'ps-vita',
    price: 100,
    deviceDiscount: 40,
  };

  const mockCategoryModel = {
    findOne: jest.fn(),
    find: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
    create: jest.fn().mockImplementation((dto) => {
      return {
        ...mockCategory,
        ...dto,
      };
    }),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: getModelToken(Category.name), useValue: mockCategoryModel },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    model = module.get<Model<CategoryDocument>>(getModelToken(Category.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createCategoryDto: CreateCategoryDto = {
        id: 34,
        name: 'PS Vita',
        price: 100,
        deviceDiscount: 40,
      };
      jest.spyOn(mockCategoryModel, 'findOne').mockResolvedValueOnce(null);
      const result = await service.create(createCategoryDto);
      expect(result).toEqual({ ...mockCategory, ...createCategoryDto });
    });

    it('should throw ConflictException if category already exists', async () => {
      const createCategoryDto: CreateCategoryDto = {
        id: 34,
        name: 'PS Vita',
        price: 100,
        deviceDiscount: 40,
      };
      jest
        .spyOn(mockCategoryModel, 'findOne')
        .mockResolvedValueOnce(mockCategory);
      await expect(service.create(createCategoryDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      jest
        .spyOn(mockCategoryModel, 'find')
        .mockResolvedValueOnce([mockCategory]);
      const result = await service.findAll();
      expect(result).toEqual([mockCategory]);
    });

    it('should throw NotFoundException if no categories are found', async () => {
      jest.spyOn(mockCategoryModel, 'find').mockResolvedValueOnce(null);
      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a category by id', async () => {
      jest
        .spyOn(mockCategoryModel, 'findOne')
        .mockResolvedValueOnce(mockCategory);
      const result = await service.findOne(mockCategory.id);
      expect(result).toEqual(mockCategory);
    });

    it('should throw NotFoundException if category is not found', async () => {
      jest.spyOn(mockCategoryModel, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOne(mockCategory.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findOneBySlug', () => {
    it('should return a category by slug', async () => {
      jest
        .spyOn(mockCategoryModel, 'findOne')
        .mockResolvedValueOnce(mockCategory);
      const result = await service.findOneBySlug(mockCategory.slug);
      expect(result).toEqual(mockCategory);
    });

    it('should throw NotFoundException if category is not found', async () => {
      jest.spyOn(mockCategoryModel, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOneBySlug('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const updateCategoryDto: UpdateCategoryDto = { name: 'Updated PS Vita' };
      jest.spyOn(mockCategoryModel, 'findOneAndUpdate').mockResolvedValueOnce({
        ...mockCategory,
        name: 'Updated PS Vita',
        slug: 'updated-ps-vita',
      } as CategoryDocument);
      const result = await service.update(mockCategory.id, updateCategoryDto);
      expect(result.name).toEqual('Updated PS Vita');
      expect(result.slug).toEqual('updated-ps-vita');
    });

    it('should throw NotFoundException if category is not found', async () => {
      jest
        .spyOn(mockCategoryModel, 'findOneAndUpdate')
        .mockResolvedValueOnce(null);
      await expect(
        service.update(mockCategory.id, { name: 'Updated PS Vita' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      jest
        .spyOn(mockCategoryModel, 'findOneAndDelete')
        .mockResolvedValueOnce(mockCategory);
      const result = await service.remove(mockCategory.id);
      expect(result).toEqual(mockCategory);
    });

    it('should throw NotFoundException if category is not found', async () => {
      jest
        .spyOn(mockCategoryModel, 'findOneAndDelete')
        .mockResolvedValueOnce(null);
      await expect(service.remove(mockCategory.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
