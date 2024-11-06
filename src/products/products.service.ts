import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { Model } from 'mongoose';
import { AddToCartPayload } from 'src/types/addToCartPayload';
import { Attribute } from 'src/types/attribute';
import { AccessoryService } from '../accessory/accessory.service';
import { CategoryService } from '../category/category.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';
import { VariantService } from '../variant/variant.service';

@Injectable()
export class ProductsService {
  private wooCommerce: WooCommerceRestApi;
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
    private accessoryService: AccessoryService,
    private categoryService: CategoryService,
    private variantService: VariantService,
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
    let description = "Oh wow, c'est une gameboy, comme dans le titre";
    const category = await this.categoryService.findOne(payload.category_id);
    const attributes: Attribute[] = [];
    let basePrice = category.price;
    const optionPromises = payload.options.map(async (option) => {
      const accessory = await this.accessoryService.findOne(option.accessoryId);
      if (accessory.description) {
        description = accessory.description;
      }
      const variant = await this.variantService.findOne(option.variantId);
      const attribute: Attribute = {
        name: accessory.name,
        visible: true,
        variation: true,
        options: [`${variant.name} - ${variant.hexcode}`],
      };
      basePrice += variant.price ?? 0;
      attributes.push(attribute);
    });
    await Promise.all(optionPromises);
    const type = 'simple';
    const images = [{ src: process.env.IMAGE_URL }];
    console.log('category name: ', category.name);
    console.log('attributes: ', attributes);
    const finalPrice =
      basePrice - (payload.applyDiscount ? category.deviceDiscount : 0);
    const createProductDto: CreateProductDto = {
      name: category.name,
      type: type,
      description: description,
      short_description: description,
      regular_price: finalPrice.toString(),
      categories: [category],
      images: images,
      attributes: attributes,
      default_attributes: attributes,
    };
    console.log('createProductDto: ', createProductDto);
    return this.getWoocommerceUrl(createProductDto);
  }
}
