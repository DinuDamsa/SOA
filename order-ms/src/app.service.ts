import { Injectable } from '@nestjs/common';
import { CartData } from './CartData';
import { OrderRequestContent } from './OrderRequestContent';

@Injectable()
export class AppService {
  private readonly cartData: CartData[];
  private readonly orders: any[];

  constructor() {
    this.cartData = [];
    this.orders = [];
  }
  getCartData(cartId: string): CartData {
    return this.cartData.find((value) => value.cartId === cartId);
  }

  addProductToCart(materialId: string, cartId: string): void {
    const foundCartData = this.cartData.find(
      (value) => value.cartId === cartId,
    );
    if (foundCartData) {
      foundCartData.materialsId.push(materialId);
    } else {
      this.cartData.push({ materialsId: [materialId], cartId });
    }
    console.log(this.cartData);
  }

  placeOrder(cartId: string, requestContent: OrderRequestContent) {
    console.log('Order registered');
    this.orders.push({ cartId, order: requestContent });
  }
}
