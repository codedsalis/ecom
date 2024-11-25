import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@ecom/auth/auth.module';
import { ProductModule } from '@ecom/product/product.module';
import { UserModule } from '@ecom/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('databaseConfig.host'),
        port: configService.get<number>('databaseConfig.port'),
        username: configService.get<string>('databaseConfig.username'),
        password: configService.get<string>('databaseConfig.password'),
        database: configService.get<string>('databaseConfig.name'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
