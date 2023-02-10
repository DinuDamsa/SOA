import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Material } from './Material';

@Controller('materials')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMaterials(): Material[] {
    return this.appService.getAvailableMaterials();
  }

  @Get(':materialCode')
  getProduct(@Param('materialCode') materialCode: string): Material {
    return this.appService.getMaterialInformation(materialCode);
  }
}
