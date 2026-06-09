import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiService {
  constructor(private prisma: PrismaService) {}

  async classifyWasteImage(imageUrl: string, wasteType: string) {
    // Mock AI image classification logic
    // Dalam implementasi real, integrate dengan model TensorFlow/PyTorch
    const confidence = Math.random() * 100;
    
    return {
      classification: wasteType,
      confidence: confidence.toFixed(2) + '%',
      recommendation: this.getWasteRecommendation(wasteType),
      processedAt: new Date(),
    };
  }

  async getWasteRecommendation(wasteType: string) {
    const recommendations: Record<string, string> = {
      PLASTIC: 'Konversi ke pelet plastik atau limbah energi',
      ORGANIC: 'Konversi ke kompos atau biogas',
      METAL: 'Daur ulang logam untuk industri manufaktur',
      PAPER: 'Daur ulang kertas untuk produk tissue/kardus',
      GLASS: 'Daur ulang kaca untuk produk kontainer baru',
      TEXTILE: 'Konversi ke insulator atau produk fashion daur ulang',
    };

    return recommendations[wasteType] || 'Proses daur ulang standar';
  }

  async estimateEconomicValue(wasteType: string, weight: number) {
    // Economic value per kilogram berdasarkan tipe limbah
    const pricePerKg: Record<string, number> = {
      PLASTIC: 5000, // Rp 5,000 per kg
      ORGANIC: 2000,
      METAL: 15000,
      PAPER: 3000,
      GLASS: 2500,
      TEXTILE: 4000,
    };

    const pricePerUnit = pricePerKg[wasteType] || 1000;
    const economicValue = weight * pricePerUnit;

    return {
      wasteType,
      weight,
      pricePerKg: pricePerUnit,
      totalValue: economicValue,
      currency: 'IDR',
    };
  }

  async estimateEnvironmentalImpact(wasteType: string, weight: number) {
    // CO2 offset calculation (kg)
    const co2OffsetPerKg: Record<string, number> = {
      PLASTIC: 3.5,
      ORGANIC: 2.0,
      METAL: 8.5,
      PAPER: 2.5,
      GLASS: 1.5,
      TEXTILE: 4.0,
    };

    const co2Offset = weight * (co2OffsetPerKg[wasteType] || 1);

    return {
      wasteType,
      weight,
      co2OffsetKg: co2Offset.toFixed(2),
      equivalentTrees: (co2Offset / 21).toFixed(2), // 1 pohon = ~21kg CO2/tahun
      waterSaved: (weight * 1000).toFixed(0) + ' liters',
      energySaved: (weight * 2.5).toFixed(2) + ' kWh',
    };
  }

  async generateAiSimulation(userId: string, data: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    const economicData = await this.estimateEconomicValue(
      data.wasteType,
      data.quantity,
    );
    const environmentalData = await this.estimateEnvironmentalImpact(
      data.wasteType,
      data.quantity,
    );

    const recommendation = await this.getWasteRecommendation(data.wasteType);

    return this.prisma.aISimulation.create({
      data: {
        userId,
        wasteType: data.wasteType,
        quantity: data.quantity,
        imageUrl: data.imageUrl,
        economicValue: economicData.totalValue,
        environmentalImpact: `${environmentalData.co2OffsetKg} kg CO2`,
        recommendation,
      },
    });
  }
}