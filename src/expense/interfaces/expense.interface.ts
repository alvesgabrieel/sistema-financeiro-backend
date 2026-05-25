import { ExpenseType } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/wasm-compiler-edge";

export interface Expense {
  id: string;
  type: ExpenseType;
  title: string;
  description: string | null;
  amount: Decimal;
  expenseDate: Date;
  isPaid: boolean;

  financialMonthId: string;

  categoryId: string | null;
  tagId: string | null;

  createdAt: Date;
}