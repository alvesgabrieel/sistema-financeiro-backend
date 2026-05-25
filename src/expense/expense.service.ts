import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExpenseDto } from './dtos/expense.dto';
import { Expense } from './interfaces/expense.interface';
import { FinancialMothService } from 'src/financial_moth/financial_moth.service';

@Injectable()
export class ExpenseService {
    constructor (
        private readonly prisma: PrismaService,
        private readonly financialMothService: FinancialMothService,
    ) {}

    async createExpense (expenseDto: ExpenseDto, userId: number): Promise<Expense> {

        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        const DateParams = {
            month: currentMonth,
            year: currentYear,
        }

        const financialMonth = await this.financialMothService.createFinancialMonth(DateParams, userId);

        const expense = await this.prisma.expense.create({
            data: {
                financialMonthId: financialMonth.id,
                categoryId: expenseDto.categoryId,
                tagId: expenseDto.tagId,
                type: expenseDto.type,
                title: expenseDto.title,
                description: expenseDto.description,
                amount: expenseDto.amount,
                expenseDate: expenseDto.expenseDate,
                isPaid: expenseDto.isPaid,
            }
        })

        return expense;

    }
}
