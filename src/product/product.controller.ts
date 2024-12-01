import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ProductService } from '@ecom/product/product.service';
import { ProductDto } from '@ecom/product/dtos/product.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ProductCreationResponse } from '@ecom/product/dtos/product-creation-response.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ type: ProductCreationResponse, status: HttpStatus.CREATED })
  async create(@Body() productDto: ProductDto) {
    const product = await this.productService.createProduct(productDto);

    return ProductCreationResponse.toModel(product, HttpStatus.CREATED);
  }
}
