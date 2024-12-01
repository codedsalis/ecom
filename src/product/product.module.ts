import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { InventoryModule } from '@ecom/inventory/inventory.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), InventoryModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
