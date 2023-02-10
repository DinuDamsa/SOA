import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Material } from './Material';
import { OrderRequestContent } from './OrderRequestContent';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('materials')
  async getMaterials(): Promise<Material[]> {
    return this.appService.getAvailableMaterials().then((value) => value);
  }

  @Get('materials/:materialCode')
  getProduct(@Param('materialCode') materialCode: string): Promise<Material> {
    return this.appService.getMaterialInformation(materialCode);
  }

  @Get('cart/:cartId')
  getCartDetails(@Param('cartId') cartId: string): Promise<any> {
    console.log(cartId);
    return this.appService.getCartDetails(cartId);
  }

  @Post('cart')
  addProductToCart(
    @Body('cartId') cartId: string,
    @Body('materialId') materialId: string,
  ): void {
    this.appService.addProductToCart(materialId, cartId);
  }

  @Post('cart/:cartId')
  placeOrder(
    @Param('cartId') cartId: string,
    @Body() requestContent: OrderRequestContent,
  ): void {
    this.appService.submitOrder(cartId, requestContent);
  }
}
