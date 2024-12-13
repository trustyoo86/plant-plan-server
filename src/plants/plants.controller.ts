import { Controller, Get, Param } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { Plant } from './interfaces/plant.interface';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Get()
  async findAll(): Promise<Plant[]> {
    return this.plantsService.findAll();
  }

  @Get(':name')
  async findByName(@Param('name') name: string): Promise<Plant> {
    const decodedName = decodeURIComponent(name);
    return this.plantsService.findByName(decodedName);
  }
}
