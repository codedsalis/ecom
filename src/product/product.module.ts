import { Module } from '@nestjs/common';
import { Product } from './product';

@Module({
  providers: [Product]
})
export class ProductModule {}
