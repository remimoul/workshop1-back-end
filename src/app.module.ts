import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
