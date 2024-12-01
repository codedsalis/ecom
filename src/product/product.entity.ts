import { Inventory } from '@ecom/inventory/inventory.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'varchar', default: 'USD' })
  currency: string;

  @OneToOne(() => Inventory, (inventory) => inventory.product)
  inventory: Inventory;
}
