import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ProductService } from '@ecom/product/product.service';
import { ProductDto } from '@ecom/product/dtos/product.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ProductCreationResponse } from '@ecom/product/dtos/product-creation-response.dto';
import { Roles } from '@ecom/common/decorators/roles.decorator';
import { Role } from '@ecom/common/enums/role.enum';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiResponse({ type: ProductCreationResponse, status: HttpStatus.CREATED })
  async create(@Body() productDto: ProductDto) {
    const product = await this.productService.createProduct(productDto);

    return ProductCreationResponse.toModel(product, HttpStatus.CREATED);
  }

  @Get()
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  async fetch() {
    const products = await this.productService.findPaginated();
    return products;
  }
}
