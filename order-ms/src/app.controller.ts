import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CartData } from './CartData';
import { OrderRequestContent } from "./OrderRequestContent";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('cart/:cartId')
  getHello(@Param('cartId') cartId: string): CartData {
    return this.appService.getCartData(cartId);
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
    this.appService.placeOrder(cartId, requestContent);
  }
}
