import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  const mockCategory = {
    id: 1,
    name: 'PS Vita',
    slug: 'ps-vita',
    price: 100,
    deviceDiscount: 40,
  };

  const mockCategoryService = {
    create: jest.fn().mockResolvedValue(mockCategory),
    findAll: jest.fn().mockResolvedValue([mockCategory]),
    findOne: jest.fn().mockResolvedValue(mockCategory),
    findOneBySlug: jest.fn().mockResolvedValue(mockCategory),
    update: jest.fn().mockResolvedValue(mockCategory),
    remove: jest.fn().mockResolvedValue(mockCategory),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createCategoryDto: CreateCategoryDto = {
        id: 1,
        name: 'PS Vita',
        price: 100,
        deviceDiscount: 40,
      };

      expect(await controller.create(createCategoryDto)).toBe(mockCategory);
      expect(service.create).toHaveBeenCalledWith(createCategoryDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      expect(await controller.findAll()).toEqual([mockCategory]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a category by id', async () => {
      expect(await controller.findOne('1')).toBe(mockCategory);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('findOneBySlug', () => {
    it('should return a category by slug', async () => {
      expect(await controller.findOneBySlug('ps-vita')).toBe(mockCategory);
      expect(service.findOneBySlug).toHaveBeenCalledWith('ps-vita');
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const updateCategoryDto: UpdateCategoryDto = { name: 'Updated PS Vita' };

      expect(await controller.update(1, updateCategoryDto)).toBe(mockCategory);
      expect(service.update).toHaveBeenCalledWith(1, updateCategoryDto);
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      expect(await controller.remove(1)).toBe(mockCategory);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
