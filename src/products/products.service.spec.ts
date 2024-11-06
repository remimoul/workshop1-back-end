// import { Test, TestingModule } from '@nestjs/testing';
// import { ProductsController } from './products.controller';
// import { ProductsService } from './products.service';
// import { getModelToken } from '@nestjs/mongoose';
// import { AccessoryService } from '../accessory/accessory.service';
// import { CategoryService } from '../category/category.service';
// import { VariantService } from '../variant/variant.service';
// import { CreateProductDto } from './dto/create-product.dto';
// import { AddToCartPayload } from 'src/types/addToCartPayload';
// import * as dotenv from 'dotenv';

// // Charger les variables d'environnement depuis .env.test
// dotenv.config({ path: '.env.test' });

// // Mock des services
// const mockProductModel = {
//   create: jest.fn().mockImplementation((dto) => ({
//     ...dto,
//     save: () => Promise.resolve(dto),
//   })),
//   find: jest.fn(),
//   findById: jest.fn(),
//   findByIdAndUpdate: jest.fn(),
//   findByIdAndDelete: jest.fn(),
// };

// const mockAccessoryService = {
//   findAll: jest.fn(),
//   findOne: jest.fn().mockResolvedValue({
//     name: 'Test Accessory',
//     description: 'Test Description',
//     price: 10,
//   }),
// };

// const mockCategoryService = {
//   findAll: jest.fn(),
//   findOne: jest.fn().mockResolvedValue({
//     id: 1,
//     name: 'Test Category',
//     price: 100,
//     deviceDiscount: 10,
//   }),
// };

// const mockVariantService = {
//   findAll: jest.fn(),
//   findOne: jest.fn().mockResolvedValue({
//     id: 1,
//     name: 'Test Variant',
//     hexcode: '#000000',
//     price: 20,
//   }),
// };

// describe('ProductsController', () => {
//   let controller: ProductsController;
//   let service: ProductsService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ProductsController],
//       providers: [
//         ProductsService,
//         {
//           provide: getModelToken('Product'),
//           useValue: mockProductModel,
//         },
//         {
//           provide: AccessoryService,
//           useValue: mockAccessoryService,
//         },
//         {
//           provide: CategoryService,
//           useValue: mockCategoryService,
//         },
//         {
//           provide: VariantService,
//           useValue: mockVariantService,
//         },
//       ],
//     }).compile();

//     controller = module.get<ProductsController>(ProductsController);
//     service = module.get<ProductsService>(ProductsService);
//   });

//   beforeAll(() => {
//     // Vérifier que les variables d'environnement nécessaires sont définies
//     const requiredEnvVars = [
//       'WOOCOMMERCE_URL',
//       'WOOCOMMERCE_USER_KEY',
//       'WOOCOMMERCE_SECRET_KEY',
//       'IMAGE_URL',
//     ];

//     requiredEnvVars.forEach((envVar) => {
//       if (!process.env[envVar]) {
//         throw new Error(
//           `Environment variable ${envVar} is required but not set`,
//         );
//       }
//     });
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('create', () => {
//     it('should create a product', async () => {
//       const createProductDto: CreateProductDto = {
//         name: 'Gameboy Colors',
//         type: 'Console',
//         description: "Oh wow, c'est une gameboy, comme dans le titre",
//         short_description: 'toujours une gameboy',
//         categories: [
//           {
//             id: 4,
//           },
//         ],
//         images: [
//           {
//             src: process.env.IMAGE_URL,
//           },
//         ],
//         attributes: [
//           {
//             id: 6,
//             position: 0,
//             visible: true,
//             variation: true,
//             options: ['Black', 'Green'],
//           },
//         ],
//         default_attributes: [
//           {
//             id: 6,
//             visible: false,
//             variation: false,
//             options: [],
//           },
//         ],
//         regular_price: '0',
//       };

//       jest.spyOn(service, 'create').mockResolvedValue(createProductDto as any);
//       const result = await controller.create(createProductDto);
//       expect(result).toEqual(createProductDto);
//     });
//   });

//   describe('findAll', () => {
//     it('should return an array of products', async () => {
//       const result = [
//         {
//           name: 'Test Product',
//           regular_price: '100',
//         },
//       ];
//       jest.spyOn(service, 'findAll').mockResolvedValue(result as any);
//       expect(await controller.findAll()).toEqual(result);
//     });
//   });

//   describe('findOne', () => {
//     it('should return a single product', async () => {
//       const result = {
//         name: 'Test Product',
//         regular_price: '100',
//       };
//       jest.spyOn(service, 'findOne').mockResolvedValue(result as any);
//       expect(await controller.findOne('1')).toEqual(result);
//     });
//   });

//   describe('update', () => {
//     it('should update a product', async () => {
//       const updateProductDto = {
//         name: 'Updated Product',
//         regular_price: '150',
//       };
//       jest.spyOn(service, 'update').mockResolvedValue(updateProductDto as any);
//       expect(await controller.update('1', updateProductDto)).toEqual(
//         updateProductDto,
//       );
//     });
//   });

//   describe('remove', () => {
//     it('should remove a product', async () => {
//       const result = {
//         name: 'Deleted Product',
//         regular_price: '100',
//       };
//       jest.spyOn(service, 'remove').mockResolvedValue(result as any);
//       expect(await controller.remove('1')).toEqual(result);
//     });
//   });

//   describe('addToCart', () => {
//     it('should add product to cart', async () => {
//       const payload: AddToCartPayload = {
//         category_id: 1,
//         applyDiscount: false,
//         options: [
//           {
//             accessoryId: '1',
//             variantId: 1,
//           },
//         ],
//       };

//       const expectedUrl = `${process.env.WOOCOMMERCE_URL}/?add-to-cart=1`;
//       jest.spyOn(service, 'addToCart').mockResolvedValue(expectedUrl);

//       expect(await controller.addToCart(payload)).toEqual(expectedUrl);
//     });
//   });
// });
