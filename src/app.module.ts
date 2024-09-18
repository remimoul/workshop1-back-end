import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ColorModule } from './color/color.module';
import { ProductsModule } from './products/products.module';
import { AccessoryModule } from './accessory/accessory.module';

@Module({
  imports: [
    //configModule permet d'utiliser le .env sur Nest.JS
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // configModule est injecter dans le MongooseModule pour pouvoir utiliser les variables d'env dedans
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('LOCAL_DB_URI'),
      }),
      inject: [ConfigService],
    }),
    ColorModule,
    ProductsModule,
    AccessoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
