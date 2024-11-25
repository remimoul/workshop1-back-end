import { Test, TestingModule } from '@nestjs/testing';
import { AccessoryService } from './accessory.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Accessory } from './schema/accessory.schema';
import { NotFoundException } from '@nestjs/common';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';
import { ObjectId } from 'mongodb';

describe('AccessoryService', () => {
  let service: AccessoryService;
  let model: Model<Accessory>;

  const mockAccessory = {
    _id: new ObjectId().toString(),
    name: 'Joystick',
    category_id: 1,
    isBase: false,
    description: 'Voici les joysticks',
  };

  // Create a proper class mock for Mongoose Model
  class MockModel {
    constructor(private data) {
      Object.assign(this, data);
    }

    save = jest.fn().mockResolvedValue(this.data);

    static find = jest.fn();
    static findById = jest.fn();
    static findOneAndUpdate = jest.fn();
    static findByIdAndDelete = jest.fn();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccessoryService,
        {
          provide: getModelToken(Accessory.name),
          useValue: MockModel,
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
      const createAccessoryDto: CreateAccessoryDto = {
        name: 'Joystick',
        category_id: 1,
        isBase: false,
        description: 'Voici les joysticks',
      };

      const mockCreatedAccessory = {
        ...createAccessoryDto,
        _id: mockAccessory._id,
      };

      // Mock the save method for this specific test
      MockModel.prototype.save = jest
        .fn()
        .mockResolvedValueOnce(mockCreatedAccessory);

      const result = await service.create(createAccessoryDto);
      expect(result).toEqual(mockCreatedAccessory);
    });
  });

  describe('findAll', () => {
    it('should return an array of accessories', async () => {
      MockModel.find.mockResolvedValueOnce([mockAccessory]);

      const result = await service.findAll();
      expect(result).toEqual([mockAccessory]);
      expect(MockModel.find).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no accessories are found', async () => {
      MockModel.find.mockResolvedValueOnce(null);

      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return an accessory by id', async () => {
      MockModel.findById.mockResolvedValueOnce(mockAccessory);

      const result = await service.findOne(mockAccessory._id);
      expect(result).toEqual(mockAccessory);
      expect(MockModel.findById).toHaveBeenCalledWith(mockAccessory._id);
    });

    it('should throw NotFoundException if accessory is not found', async () => {
      MockModel.findById.mockResolvedValueOnce(null);

      await expect(service.findOne(mockAccessory._id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update an accessory', async () => {
      const updateAccessoryDto: UpdateAccessoryDto = {
        name: 'Updated Joystick',
      };

      const existingAccessory = {
        ...mockAccessory,
        id: mockAccessory._id,
      };

      MockModel.findById.mockResolvedValueOnce(existingAccessory);
      MockModel.findOneAndUpdate.mockResolvedValueOnce({
        ...existingAccessory,
        ...updateAccessoryDto,
      });

      const result = await service.update(
        mockAccessory._id,
        updateAccessoryDto,
      );

      expect(result).toEqual({ ...existingAccessory, ...updateAccessoryDto });
      expect(MockModel.findOneAndUpdate).toHaveBeenCalledWith(
        existingAccessory.id,
        updateAccessoryDto,
        { new: true },
      );
    });

    it('should throw NotFoundException if accessory is not found', async () => {
      MockModel.findById.mockResolvedValueOnce(null);

      await expect(
        service.update(mockAccessory._id, { name: 'Updated Joystick' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an accessory', async () => {
      MockModel.findById.mockResolvedValueOnce(mockAccessory);
      MockModel.findByIdAndDelete.mockResolvedValueOnce(mockAccessory);

      const result = await service.remove(mockAccessory._id);
      expect(result).toEqual(mockAccessory);
      expect(MockModel.findByIdAndDelete).toHaveBeenCalledWith(
        mockAccessory._id,
      );
    });

    it('should throw NotFoundException if accessory is not found', async () => {
      MockModel.findById.mockResolvedValueOnce(null);

      await expect(service.remove(mockAccessory._id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
