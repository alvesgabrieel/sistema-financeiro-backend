import { ExpenseType } from '@prisma/client';

export interface ExpenseDto {
    financialMonthId?: string,
    categoryId?: string,
    tagId?: string,
    type: ExpenseType,
    title: string,
    description: string,
    amount: number,
    expenseDate: Date,
    isPaid: boolean,
}