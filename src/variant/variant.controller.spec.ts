import { ObjectId } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { VariantController } from './variant.controller';
import { VariantService } from './variant.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

describe('VariantController', () => {
  let controller: VariantController;
  let service: VariantService;

  const mockVariant = {
    _id: new ObjectId().toString(),
    id: 35235252523,
    accessory_id: '66eca047e00bf332b875780d',
    name: 'Green',
    hexcode: '#OOO',
    images: [
      { frontViewUrl: 'http:localhost:3000/frontview.png' },
      { backViewUrl: 'http:localhost:3000/backview.png' },
      { sideViewUrl: 'http:localhost:3000/sideview.png' },
    ],
    isDefault: false,
    price: 24,
    isTransparent: true,
  };

  const mockVariantService = {
    create: jest.fn().mockResolvedValue(mockVariant),
    findAll: jest.fn().mockResolvedValue([mockVariant]),
    findOne: jest.fn().mockResolvedValue(mockVariant),
    findOneBySlug: jest.fn().mockResolvedValue(mockVariant),
    update: jest.fn().mockResolvedValue(mockVariant),
    remove: jest.fn().mockResolvedValue(mockVariant),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariantController],
      providers: [
        {
          provide: VariantService,
          useValue: mockVariantService,
        },
      ],
    }).compile();

    controller = module.get<VariantController>(VariantController);
    service = module.get<VariantService>(VariantService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new variant', async () => {
      const createVariantDto: CreateVariantDto = {
        id: 35235252523,
        accessory_id: '66eca047e00bf332b875780d',
        name: 'Green',
        hexcode: '#OOO',
        images: [
          { frontViewUrl: 'http:localhost:3000/frontview.png' },
          { backViewUrl: 'http:localhost:3000/backview.png' },
          { sideViewUrl: 'http:localhost:3000/sideview.png' },
        ],
        isDefault: false,
        price: 24,
        isTransparent: true,
      };

      expect(await controller.create(createVariantDto)).toBe(mockVariant);
      expect(service.create).toHaveBeenCalledWith(createVariantDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of variants', async () => {
      expect(await controller.findAll()).toEqual([mockVariant]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a variant by id', async () => {
      expect(await controller.findOne('1')).toBe(mockVariant);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a variant', async () => {
      const UpdateVariantDto: UpdateVariantDto = { name: 'Updated PS Vita' };

      expect(await controller.update(mockVariant._id, UpdateVariantDto)).toBe(
        mockVariant,
      );
      expect(service.update).toHaveBeenCalledWith(1, UpdateVariantDto);
    });
  });

  describe('remove', () => {
    it('should remove a variant', async () => {
      expect(await controller.remove(mockVariant._id)).toBe(mockVariant);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
