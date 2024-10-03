import { UpdateAccessoryDto } from './dto/update-accessory.dto';
import { ObjectId } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { AccessoryController } from './accessory.controller';
import { AccessoryService } from './accessory.service';
import { CreateAccessoryDto } from './dto/create-accessory.dto';

describe('AccessoryController', () => {
  let controller: AccessoryController;
  let service: AccessoryService;

  const accessoryMock = {
    _id: new ObjectId().toString(),
    name: 'Joystick',
    category_id: 1,
    isBase: false,
    description: 'Voici les joysticks',
  };

  const mockAccessoryService = {
    create: jest.fn().mockResolvedValue(accessoryMock),
    findAll: jest.fn().mockResolvedValue([accessoryMock]),
    findOne: jest.fn().mockResolvedValue(accessoryMock),
    findOneBySlug: jest.fn().mockResolvedValue(accessoryMock),
    update: jest.fn().mockResolvedValue(accessoryMock),
    remove: jest.fn().mockResolvedValue(accessoryMock),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessoryController],
      providers: [
        { provide: AccessoryService, useValue: mockAccessoryService },
      ],
    }).compile();

    controller = module.get<AccessoryController>(AccessoryController);
    service = module.get<AccessoryService>(AccessoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new accessory', async () => {
      const createAccessoryDto: CreateAccessoryDto = {
        name: 'Joystick',
        category_id: 1,
        isBase: false,
        description: 'Voici les joysticks',
      };

      expect(await controller.create(createAccessoryDto)).toBe(accessoryMock);
      expect(service.create).toHaveBeenCalledWith(createAccessoryDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of accessories', async () => {
      expect(await controller.findAll()).toEqual([accessoryMock]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an accessory by id', async () => {
      expect(await controller.findOne('1')).toBe(accessoryMock);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an accessory', async () => {
      const UpdateAccessoryDto: UpdateAccessoryDto = {
        name: 'Updated PS Vita',
      };

      expect(
        await controller.update(accessoryMock._id, UpdateAccessoryDto),
      ).toBe(accessoryMock);
      expect(service.update).toHaveBeenCalledWith(1, UpdateAccessoryDto);
    });
  });

  describe('remove', () => {
    it('should remove an accessory', async () => {
      expect(await controller.remove(accessoryMock._id)).toBe(accessoryMock);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
