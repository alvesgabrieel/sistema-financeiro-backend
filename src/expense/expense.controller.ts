import { Body, Controller, Post, Req, UnauthorizedException } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import type { ExpenseDto } from './dtos/expense.dto';
import { Expense } from './interfaces/expense.interface';
import type { Request } from 'express';

@Controller('expense')
export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService) {}

    @Post()
    async createExpense(
        @Body() expenseDto: ExpenseDto,
        @Req() req: Request
    ): Promise<Expense> {
        if (!req.user) throw new UnauthorizedException();

        return this.expenseService.createExpense(
          expenseDto,
          req.user.sub,
        );
    }
}
