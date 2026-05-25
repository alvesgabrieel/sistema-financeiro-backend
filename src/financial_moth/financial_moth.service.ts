import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FinancialMonth } from './interfaces/createFinancialMonth.interface';
import { CreateFinancialMonthDto } from './dtos/createFinancialMonth.dto';

@Injectable()
export class FinancialMothService {
    constructor(private readonly prisma: PrismaService) {}

    async createFinancialMonth(createFinancialMonthDto: CreateFinancialMonthDto, userId: number): Promise<FinancialMonth> { 
        const { month, year } = createFinancialMonthDto;
        
        const financialMonth = await this.prisma.financialMonth.upsert({
            where: {
                userId_month_year: {
                userId,
                month,
                year
                },
            },
            create: {
                userId,
                month,
                year
            },
            update: {},
        });
        return financialMonth;
    }
}
