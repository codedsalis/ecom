import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@ecom/auth/auth.module';
import { ProductModule } from '@ecom/product/product.module';
import configuration from '@ecom/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@ecom/user/user.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
