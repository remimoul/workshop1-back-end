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

@Injectable()
export class ProductsService {
  private wooCommerce: WooCommerceRestApi;

  constructor(@InjectModel(Product.name) private ProductModel: Model<Product>) {
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

  async getWoocommerceUrl() {
    const data = {
      name: 'F4LL',
      type: 'grouped',
      regular_price: '21.99',
      description: "J'aimerais bien dormir",
      short_description:
        'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      categories: [
        {
          id: 9,
        },
        {
          id: 14,
        },
      ],
      images: [
        {
          src: 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_back.jpg',
        },
      ],
    };
    this.wooCommerce
      .post('products', data)
      .then((response) => {
        console.log(response.data);
        return response;
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
}
