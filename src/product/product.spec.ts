import { Test, TestingModule } from '@nestjs/testing';
import { ProductEntity } from './product.entity';

describe('Product', () => {
  let provider: ProductEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductEntity],
    }).compile();

    provider = module.get<ProductEntity>(ProductEntity);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
