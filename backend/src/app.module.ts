import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import * as Joi from 'joi';
import { ProductsService } from './products/services/products.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cpq19e88fa8c739o35k0-a.frankfurt-postgres.render.com',
      port: 5432,
      username: 'ybokhari',
      password: '7hkx8bdDsDDZhp0OO2wdxyiUuEqofPvU',
      database: 'taslim_baby',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly productService: ProductsService) {}

  async onModuleInit() {
    await this.productService.initializeProducts();
  }
}
