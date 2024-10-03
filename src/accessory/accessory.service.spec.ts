import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { ObjectId } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { AccessoryService } from './accessory.service';
import { Model } from 'mongoose';
import { Accessory } from './schema/accessory.schema';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { mock } from 'node:test';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';

describe('AccessoryService', () => {
  let service: AccessoryService;
  let model: Model<Accessory>;

  const accessoryMock = {
    _id: new ObjectId().toString(),
    name: 'Joystick',
    category_id: 1,
    isBase: false,
    description: 'Voici les joysticks',
  };

  const mockAccessoryModel = {
    findOne: jest.fn(),
    find: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
    new: jest.fn().mockResolvedValue(accessoryMock),
    constructor: jest.fn().mockResolvedValue(accessoryMock),
    save: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccessoryService,
        {
          provide: getModelToken(Accessory.name),
          useValue: mockAccessoryModel,
        },
      ],
    }).compile();

    service = module.get<AccessoryService>(AccessoryService);
    model = module.get<Model<Accessory>>(getModelToken(Accessory.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new accessory', async () => {
      const createAccessoryDto: CreateAccessoryDto = accessoryMock;
      jest.spyOn(mockAccessoryModel, 'findOne').mockResolvedValueOnce(null);
      jest
        .spyOn(mockAccessoryModel, 'save')
        .mockResolvedValueOnce(accessoryMock);

      const result = await service.create(createAccessoryDto);
      expect(result).toEqual(accessoryMock);
    });
  });

  describe('findAll', () => {
    it('should return an array of accessories', async () => {
      jest
        .spyOn(mockAccessoryModel, 'find')
        .mockResolvedValueOnce([accessoryMock]);

      const result = await service.findAll();

      expect(result).toEqual([accessoryMock]);
    });
    it('should throw NotFoundException if no accessories are found', async () => {
      jest.spyOn(mockAccessoryModel, 'find').mockRejectedValueOnce(null);

      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a accessory by id', async () => {
      jest
        .spyOn(mockAccessoryModel, 'findOne')
        .mockResolvedValueOnce(accessoryMock);

      const result = await service.findOne(accessoryMock._id);

      expect(result).toEqual(accessoryMock);
    });

    it('should throw NotFoundException if accessory is not found', async () => {
      jest.spyOn(mockAccessoryModel, 'findOne').mockResolvedValueOnce(null);

      await expect(service.findOne(accessoryMock._id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a variant', async () => {
      const updateAccessoryDto: UpdateAccessoryDto = { name: 'Blue' };

      jest
        .spyOn(mockAccessoryModel, 'find')
        .mockResolvedValueOnce([accessoryMock]);
      jest.spyOn(mockAccessoryModel, 'findOneAndUpdate').mockResolvedValueOnce({
        ...accessoryMock,
        name: 'Blue',
      });
      const result = await service.update(
        accessoryMock._id,
        updateAccessoryDto,
      );

      expect(result.name).toEqual('Blue');
    });

    it('should throw NotFoundException if category is not found', async () => {
      jest.spyOn(mockAccessoryModel, 'find').mockResolvedValueOnce(null);

      await expect(
        service.update(accessoryMock._id, { name: 'green' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a variant', async () => {
      jest
        .spyOn(mockAccessoryModel, 'find')
        .mockResolvedValueOnce([accessoryMock]);
      jest
        .spyOn(mockAccessoryModel, 'findOneAndDelete')
        .mockResolvedValueOnce(accessoryMock);

      const result = await service.remove(accessoryMock._id);

      expect(result).toEqual(accessoryMock);
    });

    it('should throw NotFoundException if variant is not found', async () => {
      jest.spyOn(mockAccessoryModel, 'find').mockResolvedValueOnce(null);

      await expect(service.remove(accessoryMock._id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
