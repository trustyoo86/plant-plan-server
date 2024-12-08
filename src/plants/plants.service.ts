import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Plant } from './interfaces/plant.interface';
import { apiConfig } from '../config/api.config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PlantsService {
  constructor(private readonly httpService: HttpService) {}

  private readonly baseUrl = apiConfig.forestService.baseUrl;
  private readonly apiKey = apiConfig.forestService.apiKey;

  async findAll(): Promise<Plant[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/getTreeService`, {
          params: {
            ServiceKey: this.apiKey,
            numOfRows: 20,
            pageNo: 1,
          },
        }),
      );

      const items = response.data.response.body.items.item;
      return this.mapToPlants(Array.isArray(items) ? items : [items]);
    } catch (error) {
      console.error('Error fetching plants:', error);
      return [];
    }
  }

  async findByName(name: string): Promise<Plant> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/getTreeService`, {
          params: {
            ServiceKey: this.apiKey,
            plntbneNm: name, // 식물명으로 검색
          },
        }),
      );

      const items = response.data.response.body.items.item;
      if (!items) {
        throw new NotFoundException(`Plant with name ${name} not found`);
      }

      const plants = this.mapToPlants(Array.isArray(items) ? items : [items]);
      return plants[0];
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error fetching plant:', error);
      throw new NotFoundException(`Error fetching plant with name ${name}`);
    }
  }

  private mapToPlants(items: any[]): Plant[] {
    return items.map((item) => ({
      id: item.treeNum || '',
      name: item.plntbneNm || '',
      scientificName: item.plntbneNm || '',
      description: item.content || '',
      height: item.height || '',
      width: item.width || '',
      leafColor: item.leafColor || '',
      flowerColor: item.flowerColor || '',
      bloomingSeason: item.bloomingSeason || '',
      managementLevel: item.managementLevel || '',
      growthRate: item.growthRate || '',
      lightRequirement: item.lightRequirement || '',
      waterRequirement: item.waterRequirement || '',
      imageUrl: item.imgUrl || '',
    }));
  }
}
