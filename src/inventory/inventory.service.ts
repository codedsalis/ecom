import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Product } from '@ecom/product/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from '@ecom/inventory/inventory.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    private readonly dataSource: DataSource,
  ) {}

  async saveInventory(
    product: Product,
    quantity: number,
    manager: EntityManager = this.dataSource.manager,
  ): Promise<Inventory> {
    const inventory = new Inventory();
    inventory.product = product;
    inventory.quantity = quantity;

    try {
      await manager.save(inventory);
      return inventory;
    } catch (error) {
      Logger.error(`Failed to save inventory: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error saving inventory.');
    }
  }
}
