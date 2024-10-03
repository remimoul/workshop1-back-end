import { Test, TestingModule } from '@nestjs/testing';
import { VariantService } from './variant.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Variant } from './schema/variant.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { ObjectId } from 'mongodb';
import { mock } from 'node:test';

describe('VariantService', () => {
  let service: VariantService;
  let model: Model<Variant>;

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

  const mockVariantModel = {
    findOne: jest.fn(),
    find: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
    new: jest.fn().mockResolvedValue(mockVariant),
    constructor: jest.fn().mockResolvedValue(mockVariant),
    save: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VariantService,
        { provide: getModelToken(Variant.name), useValue: mockVariantModel },
      ],
    }).compile();

    service = module.get<VariantService>(VariantService);
    model = module.get<Model<Variant>>(getModelToken(Variant.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new variant', async () => {
      const createVariantDto: CreateVariantDto = mockVariant;
      jest.spyOn(mockVariantModel, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(mockVariantModel, 'save').mockResolvedValueOnce(mockVariant);

      const result = await service.create(createVariantDto);

      expect(result).toEqual(mockVariant);
    });

    // it('should thorw BadRequestException if variant not created', async () => {
    //   const createVariantDto = {
    //     id: 35235252523,
    //     accessory_id: '66eca047e00bf332b875780d',
    //     name: 'Green',
    //     hexcode: '#OOO',
    //     price: 24,
    //     isTransparent: true,
    //   };
    //   jest
    //     .spyOn(mockVariantModel, 'findOne')
    //     .mockResolvedValueOnce(mockVariant);

    //   await expect(service.create(createVariantDto)).rejects.toThrow(
    //     BadRequestException,
    //   );
    // });
  });

  describe('findAll', () => {
    it('should return an array of variants', async () => {
      jest.spyOn(mockVariantModel, 'find').mockResolvedValueOnce([mockVariant]);

      const result = await service.findAll();

      expect(result).toEqual([mockVariant]);
    });

    it('should throw NotFoundException if no variants are found', async () => {
      jest.spyOn(mockVariantModel, 'find').mockResolvedValueOnce(null);

      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a variant by id', async () => {
      jest
        .spyOn(mockVariantModel, 'findOne')
        .mockResolvedValueOnce(mockVariant);

      const result = await service.findOne(+mockVariant._id);

      expect(result).toEqual(mockVariant);
    });

    it('should throw NotFoundException if variant is not found', async () => {
      jest.spyOn(mockVariantModel, 'findOne').mockResolvedValueOnce(null);

      await expect(service.findOne(+mockVariant._id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByAccessory', () => {
    it('should return an array of variants by accessory id', async () => {
      jest.spyOn(mockVariantModel, 'find').mockResolvedValueOnce([mockVariant]);

      const result = await service.findByAccessory(mockVariant.accessory_id);

      expect(result).toEqual([mockVariant]);
    });

    it('should throw NotFoundException if no variants are found with this accessory id', async () => {
      jest.spyOn(mockVariantModel, 'find').mockResolvedValueOnce(null);

      await expect(
        service.findByAccessory(mockVariant.accessory_id),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a variant', async () => {
      const updateVariantDto: UpdateVariantDto = { name: 'Blue' };

      jest.spyOn(mockVariantModel, 'find').mockResolvedValueOnce([mockVariant]);
      jest.spyOn(mockVariantModel, 'findOneAndUpdate').mockResolvedValueOnce({
        ...mockVariant,
        name: 'Blue',
      });
      const result = await service.update(+mockVariant._id, updateVariantDto);

      expect(result.name).toEqual('Blue');
    });

    it('should throw NotFoundException if category is not found', async () => {
      jest.spyOn(mockVariantModel, 'find').mockResolvedValueOnce(null);

      await expect(
        service.update(+mockVariant._id, { name: 'green' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a variant', async () => {
      jest.spyOn(mockVariantModel, 'find').mockResolvedValueOnce([mockVariant]);
      jest
        .spyOn(mockVariantModel, 'findOneAndDelete')
        .mockResolvedValueOnce(mockVariant);

      const result = await service.remove(+mockVariant._id);

      expect(result).toEqual(mockVariant);
    });

    it('should throw NotFoundException if variant is not found', async () => {
      jest.spyOn(mockVariantModel, 'find').mockResolvedValueOnce(null);

      await expect(service.remove(+mockVariant._id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
