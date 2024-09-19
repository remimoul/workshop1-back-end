import { CategoryService } from './../category/category.service';
import { AccessoryService } from './../accessory/accessory.service';
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { AddToCartPayload } from 'src/types/addToCartPayload';
import { Attribute } from 'src/types/attribute';

@Injectable()
export class ProductsService {
  private wooCommerce: WooCommerceRestApi;

  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
    private accessoryService: AccessoryService,
    private categoryService: CategoryService,
  ) {
    this.wooCommerce = new WooCommerceRestApi({
      url: process.env.WOOCOMMERCE_URL,
      consumerKey: process.env.WOOCOMMERCE_USER_KEY,
      consumerSecret: process.env.WOOCOMMERCE_SECRET_KEY,
      version: 'wc/v3',
    });
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.ProductModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    const products = await this.ProductModel.find();
    if (!products) {
      throw new NotFoundException(`No products found`);
    }
    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.ProductModel.findById(id);

    if (!product) {
      throw new NotFoundException(`No products found with the id n°${id}`);
    }

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.ProductModel.findById(id);

    if (!product) {
      throw new NotFoundException(`No products found with the id n°${id}`);
    }

    const updatedProduct = await this.ProductModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );

    return updatedProduct;
  }

  async remove(id: string) {
    const product = await this.ProductModel.findById(id);

    if (!product) {
      throw new NotFoundException(`No products found with the id n°${id}`);
    }

    const deletedProduct = await this.ProductModel.findByIdAndDelete(id);

    return deletedProduct;
  }

  async getWoocommerceUrl(data: CreateProductDto): Promise<string> {
    try {
      const response = await this.wooCommerce.post('products', data);
      console.log(response.data);
      const link =
        process.env.WOOCOMMERCE_URL + '/?add-to-cart=' + response.data.id;
      return link;
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
    }
  }

  async addToCart(payload: AddToCartPayload) {
    // const payload2: AddToCartPayload = {
    //   category_id: 1,
    //   applyDiscount: false,
    //   options: [
    //     {
    //       accessoryId: '66ec9f269e09c12798750493',
    //       variantId: 1726783271237,
    //     },
    //     { accessoryId: '66eca047e00bf332b875780d', variantId: 1726783559931 },
    //   ],
    // };

    const attributes: Attribute[] = [];

    // Créer un tableau de promesses incluant les options
    const optionPromises = payload.options.map(async (option) => {
      const accessory = await this.accessoryService.findOne(option.accessoryId);
      const variant = await this.accessoryService.getVariantById(
        option.variantId,
      );

      const attribute: Attribute = {
        name: accessory.name,
        visible: true,
        variation: true,
        options: [`${variant.name} - ${variant.hexcode}`],
      };

      attributes.push(attribute);
    });

    await Promise.all(optionPromises);

    const category = await this.categoryService.findOne(payload.category_id);

    const type = 'simple';
    const description = "Oh wow, c'est une gameboy, comme dans le titre";
    const images = [{ src: process.env.IMAGE_URL }];

    console.log('category name: ', category.name);
    console.log('attributes: ', attributes);

    const createProductDto: CreateProductDto = {
      name: category.name,
      type: type,
      description: description,
      short_description: description,
      categories: [category],
      images: images,
      attributes: attributes,
      default_attributes: attributes,
    };

    console.log('createProductDto: ', createProductDto);

    return this.getWoocommerceUrl(createProductDto);
  }
}
