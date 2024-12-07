import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InventoryService } from '@ecom/inventory/inventory.service';
import { Product } from '@ecom/product/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProductDto } from '@ecom/product/dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly inventoryService: InventoryService,
    private readonly dataSource: DataSource,
  ) {}

  async createProduct(productDto: ProductDto): Promise<Product> {
    const product = new Product();
    product.name = productDto.name;
    product.description = productDto.description;
    product.price = productDto.price;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(product);
      await this.inventoryService.saveInventory(
        product,
        productDto.quantity,
        queryRunner.manager,
      );
      await queryRunner.commitTransaction();

      return await this.productRepository.findOne({
        where: { id: product.id },
        relations: ['inventory'],
      });
    } catch (error) {
      Logger.error(`Failed to create product: ${error.message}`, error.stack);
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException(
        'Something went wrong, please try again',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findPaginated() {}
}
