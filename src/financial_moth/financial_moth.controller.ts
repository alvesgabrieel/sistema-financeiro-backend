import { Body, Controller, Post, Req, UnauthorizedException } from '@nestjs/common';
import { FinancialMothService } from './financial_moth.service';
import type { CreateFinancialMonthDto } from './dtos/createFinancialMonth.dto';
import { FinancialMonth } from './interfaces/createFinancialMonth.interface';
import type { Request } from 'express';

@Controller('financial-moth')
export class FinancialMothController {
    constructor(private readonly financialMothService: FinancialMothService) {}

    @Post()
    async createFinancialMonth(
        @Body() createFinancialMonthDto: CreateFinancialMonthDto,
        @Req() req: Request
    ): Promise<FinancialMonth> {
        if (!req.user) throw new UnauthorizedException();

        return this.financialMothService.createFinancialMonth(
          createFinancialMonthDto,
          req.user.sub,
        );
    }
}
