import { BaseResponse } from '@ecom/common/dtos/base-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class InventoryResponseDto {
  // @Expose()
  // id: number;

  @Expose()
  quantity: number;
}

export class ProductCreationResponse extends BaseResponse<ProductCreationResponse> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  available_quantity: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  quantity_available: number;

  @ApiProperty()
  @Expose()
  @Type(() => InventoryResponseDto)
  inventory: InventoryResponseDto;
}
