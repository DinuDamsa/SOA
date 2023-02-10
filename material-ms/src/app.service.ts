import { Injectable } from '@nestjs/common';
import { Material } from './Material';

@Injectable()
export class AppService {
  private materials: Material[] = [
    {
      materialId: '11',
      name: 'name',
      description: 'desc',
      quantity: 1,
      shortDescription: 'shortDesc',
    },
    {
      materialId: '13',
      name: 'name2',
      description: 'desc',
      quantity: 1,
      shortDescription: 'shortDesc',
    },
  ];
  getAvailableMaterials(): Material[] {
    return this.materials;
  }

  getMaterialInformation(materialId: string): Material {
    return this.materials.find((mat) => mat.materialId === materialId);
  }
}
