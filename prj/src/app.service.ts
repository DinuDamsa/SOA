import { Injectable } from '@nestjs/common';
import { Material } from './Material';
import axios, { AxiosResponse } from 'axios';
import { MATERIALS_MS_URL, ORDER_MS_URL } from './config';
import { OrderRequestContent } from './OrderRequestContent';

@Injectable()
export class AppService {
  async getAvailableMaterials(): Promise<Material[]> {
    const materials = [];
    console.log(`${MATERIALS_MS_URL}/materials`);
    await axios
      .get(`${MATERIALS_MS_URL}/materials`)
      .then((res) => materials.push(...res.data));
    return materials;
  }

  getMaterialInformation(materialId: string): Promise<Material> {
    return axios
      .get(`${MATERIALS_MS_URL}/materials/${materialId}`)
      .then((res: AxiosResponse<Material>) => res.data);
  }

  async getCartDetails(cartId: string): Promise<any> {
    console.log('Cart info retrieved');

    return axios.get(`${ORDER_MS_URL}/cart/${cartId}`).then((res) => res.data);
  }

  addProductToCart(materialId: string, cartId: string): void {
    console.log('Product added to cart');
    axios
      .post(`${ORDER_MS_URL}/cart`, { materialId, cartId })
      .then(() => console.log('Request done'));
  }

  submitOrder(cartId: string, requestContent: OrderRequestContent): void {
    axios
      .post(`${ORDER_MS_URL}/cart/${cartId}`, requestContent)
      .then(() => console.log('Request done'));
  }
}
